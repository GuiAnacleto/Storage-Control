# Storage-Control
 This is a project created to control the stock of a store, the initial version has entries, write-offs, consultations and reports. It was created for my mother's private business.

#database.py

This file is responsible for storing all data in a database created with the sqlite3 library. in it I created functions that with the eel library communicate with the entire frontend interface




# Ignorar


Claro, aqui está a descrição para a documentação da lambda "post-ritm-metadata" que realiza as ações que você mencionou:

**Nome da Lambda:** post-ritm-metadata

**Descrição:**
Esta lambda é responsável por processar e salvar informações de um formulário fornecido dentro da ferramenta "ServiceNow" em um banco de dados "DynamoDB". O formulário contém informações cruciais para o gerenciamento de dados e modelagem. As informações disponibilizadas no payload incluem os seguintes campos:

1. **Stackld:** A pilha de destino para a solicitação.
2. **Abertura Prévia:** A data de abertura prévia da solicitação.
3. **RITM:** O número de Registro de Item de Tarefa associado à solicitação.
4. **Tipo de Gerenciamento de Modelo de Dados:** O tipo de gerenciamento de modelo de dados a ser aplicado.
5. **Nome do Modelo:** O nome do modelo de dados.
6. **Descrição Resumida:** Uma breve descrição do modelo de dados.
7. **Descrição Completa:** Uma descrição mais detalhada do modelo de dados.
8. **Tipo de Modelagem:** O tipo de modelagem a ser aplicado.
9. **Tecnologia Tipo de Modelagem:** A tecnologia específica relacionada à modelagem.
10. **Camada do Datamesh:** A camada do Datamesh para a modelagem de dados.

Além disso, esta lambda realiza as seguintes ações:

- **Data de Criação:** Registra a data e hora em que a solicitação foi processada e as informações foram armazenadas.
- **Status da Solicitação:** Atualiza o status da solicitação na ferramenta "ServiceNow" para refletir o processamento bem-sucedido.
- **GSL Status:** Registra o status da solicitação em relação à Governança de Serviços de Dados.

Essa lambda é fundamental para garantir que as informações de modelagem de dados sejam devidamente registradas no DynamoDB, permitindo um controle eficaz e acompanhamento das solicitações de modelagem de dados na organização.