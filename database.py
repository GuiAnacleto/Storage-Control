import sqlite3
import eel
import os
import csv
from datetime import datetime

#conn = sqlite3.connect('produtos.db')
#cursor = conn.cursor()

#cursor.execute("DROP TABLE vendas;")

#conn.commit()

#ctrl shift p to open sqlite
#cursor.execute("CREATE TABLE produtos (codigo integer, nome text, custo double, venda double, quantidade integer, fornecedor text, NNF text, data_cadastro text, data_alteracao text, alteracao text)")
#cursor.execute("CREATE TABLE vendas(codigo integer, nome text, venda_original double, venda_real double, quantidade integer, data_venda date)")

#cursor.execute("CREATE UNIQUE INDEX ID ON produtos (codigo);")

#insertProdutos('guilherme',100.00,100.00,5,'lolica','005','25','25','mudou')
@eel.expose
def insertProdutos(Codigo,nome,custo,venda,quantidade,fornecedor,NNF,data_cadastro,data_alteracao,alteracao):
    #Cria conexão com o banco de dados
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()

    params = (Codigo, nome, str(custo), str(venda), str(quantidade),
          fornecedor, NNF, data_cadastro, data_alteracao, alteracao)

    cursor.execute("INSERT INTO produtos VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", params)
        
    conn.commit()
    return "OK"

@eel.expose
def insertVendas(codigo, nome, venda_original, venda_real, qtd, data_venda):
    #Cria conexão com o banco de dados
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()

    params = (codigo, nome, str(venda_original), str(venda_real), qtd, data_venda)

    cursor.execute("INSERT INTO vendas VALUES (?, ?, ?, ?, ?, ?)", params)
        
    conn.commit()
    return

#deleteTable('produtos', '21')
@eel.expose
def deleteTable(tabela, codigo):
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()

    cursor.execute("DELETE FROM " + tabela + " WHERE codigo = ?", [codigo])

    conn.commit()
    return

@eel.expose
def selectTable(tabela, codigo):
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM " + tabela + " WHERE codigo = ?", [codigo])

    conn.commit()
    return cursor.fetchone()

@eel.expose
def selectTableArray(tabela):
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM " + tabela)

    conn.commit()
    return cursor.fetchall()

@eel.expose
def alterTable(tabela, dado, valor, codigo):
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()
    #interpolar
    comando = "UPDATE %s SET %s = '%s' WHERE codigo = '%s'"%(tabela,dado,valor,codigo)

    cursor.execute(comando)

    conn.commit()
    return 

@eel.expose
def qtdProductsProducts():
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()

    cursor.execute("SELECT SUM(quantidade) FROM produtos;")
    codigo = cursor.fetchone()
    codigo = codigo[0]
    codigo = str(codigo)

    conn.commit()
    return codigo

@eel.expose
def qtdValueProducts():
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()

    cursor.execute("drop table if exists Temp")

    cursor.execute("CREATE TABLE Temp(tempCOD  text, TempQTD  int, tempValue double, tempTotal double);")

    cursor.execute("INSERT INTO Temp(tempCOD, TempQTD, tempValue, tempTotal) SELECT codigo, quantidade, custo, quantidade * custo FROM produtos")

    cursor.execute("SELECT SUM(tempTotal) FROM Temp;")
    codigo = cursor.fetchone()
    codigo = codigo[0]
    codigo = str(codigo)

    cursor.execute("DROP TABLE Temp;")

    conn.commit()
    return codigo

@eel.expose
def GenerateCod():
    #Cria conexão com o banco de dados
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()

    cursor.execute("SELECT MAX(codigo) FROM produtos")
    codigo = cursor.fetchone()
    try:
        ID = ','.join(str(v) for v in codigo)
        ID = int(ID) + 1
        ID = str(ID)
    except:
        ID = '1000'

    if ID[0] == '2':
        ID = int(ID) + 1000
        ID = str(ID)
    
    conn.commit()
    return ID

@eel.expose
def BaixaProduto(qtd,cod,nome,venda,today):

    info = selectTable('produtos', cod)

    oldQtd = info[4]

    NewQtd = int(oldQtd) - int(qtd)

    if NewQtd >= 0:

            NewQtd = str(NewQtd)

            alterTable('produtos', 'quantidade', NewQtd, cod)

            alterTable('produtos', 'data_alteracao', today, cod)

            alterTable('produtos', 'alteracao', 'baixa na quantidade', cod)

            insertVendas(cod, str(nome), str(info[2]), str(venda), int(qtd), str(today))

            return "OK", str(NewQtd)
    return "NC"

@eel.expose
def exportRelProdutos():
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()
    cursor.execute("select * from produtos")

    # datetime object containing current date and time
    now = datetime.now()
     # dd/mm/YY H:M:S
    dt_string = now.strftime("%d-%m-%Y %H%M%S")
    with open("Produtos " + dt_string + ".csv", "w") as csv_file:
        csv_writer = csv.writer(csv_file, delimiter="\t")
        csv_writer.writerow([i[0] for i in cursor.description])
        csv_writer.writerows(cursor)

    dirpath = os.getcwd() + "\\" + "Produtos " + dt_string + ".csv"

    conn.close()

    return "Relatorio Gerado Em: {}".format(dirpath)

@eel.expose
def exportRelVendas():
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()
    cursor.execute("select * from vendas")

    # datetime object containing current date and time
    now = datetime.now()
     # dd/mm/YY H:M:S
    dt_string = now.strftime("%d-%m-%Y %H%M%S")
    with open("Vendas " + dt_string + ".csv", "w") as csv_file:
        csv_writer = csv.writer(csv_file, delimiter="\t")
        csv_writer.writerow([i[0] for i in cursor.description])
        csv_writer.writerows(cursor)

    dirpath = os.getcwd() + "\\" + "Vendas " + dt_string + ".csv"

    conn.close()

    return "Relatorio Gerado Em: {}".format(dirpath)



#BaixaProduto('2','1006','BB','70','2020-12-27')

eel.init(r"frontend")
eel.start(r"./html/index.html", jinja_templates="templates")

#busca = selectTable('produtos', '1000')
#print(busca[7])

#insertProdutos('guilherme',100,200,5,'lola','005','25','25','custo')
#alterTable("produtos","quantidade","198","1006")

#print(GenerateCod())
#deleteTable('produtos', '1000')



















