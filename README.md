# ALESSANDRO PINHEIRO DE SOUZA => IPDV

## Desenvolvimento backend

Instalação:

Abrir o projeto com o terminal e navegar até o diretório ``/api`` com o seguinte comando  ``cmd cd api`` em seguinda instalar as dependências do NodeJS executando o comando ``cmd npm i``

Em seguida navegar até o diretório ``/web`` com o seguinte comando ``cmd cd ../web`` em seguinda instalar as dependências do NodeJS executando o comando ``cmd npm i``

Após instaladas todas as dependências no diretório ``/api`` subir o bucket usando o seguinte comando ``cmd cd ../api docker-compose up -d`` para subir container com a imagem do node e do banco postgres (essa ação somente é necessária caso você não tenha ambos os programas instalados).

Uma vez com o container _online_ execute o comando  ``cmd npm run dev`` para execução em modo _development_ ou ``cmd npm start`` para execução em modo _production_.

Em seguinda execute o comando para inicializar o servidor web ``cmd cd ../web npm run serve``, deverá exibir uma mensagem após uns segundos com as informações do servidor em execução:

```
 DONE  Compiled successfully in XXXXms


  App running at:
  - Local:   http://127.0.0.1:8081/
  - Network: http://192.168.0.104:8081/

  Note that the development build is not optimized.
  To create a production build, run npm run build.

````

- Acesse uma das opções em seu navegador (local/Network)

Importe o arquivo dump-ipdv-202206171346 na raiz do projeto para seu banco postgres e configure suas credências de acesso ao banco em ``./api/src/data-source.ts``

```
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost", //Mude aqui
    port: 5432, //Mude aqui caso use outra porta
    username: "postgres", //Mude aqui
    password: "041216", //Mude aqui
    database: "ipdv", //Mude aqui
    // Não modificar os itens abaixo
    synchronize: true,
    logging: false,
    entities: [
        Usuario,
        Cargo,
        Departamento,
        CentroDeCusto,
        UsuarioCargo,
        UsuarioDepartamento,
        DepartamentoCentroDeCusto,
        StoreToken
    ],
    migrations: [],
    subscribers: [],
});
```

- Existe um usuário já registrado e com os dados salvo na view para login facilitado

-- Importante se não conseguir executar o restore do banco basta executar os passos antes do import e adicionar usários de acesso via postman, deixarei os esquemas na raiz do projeto.