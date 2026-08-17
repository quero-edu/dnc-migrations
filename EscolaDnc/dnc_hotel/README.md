# DNC HOTEL

O DNC Hotel é um projeto de reserva de hoteis, teremos perfil de user e admin, o user pode fazer reservas e o admin pode criar os hoteis e aceitar as reservas, siga os passos abaixo para baixar o projeto e rodar.

## Clone

Clone o projeto em sua máquina local:

ssh:

```bash
git@github.com:codethi/dnc_hotel.git
```
https:

```bash
https://github.com/codethi/dnc_hotel.git
```

## Banco de dados

Instale em seu computador local o postgres e o [redis](https://redis.io/docs/latest/develop/).

<details>
<summary>Instalação do Postgres</summary>

Uma das formas de usar o banco de dados Postgres é instalá-lo em seu computador, mas isso depende do ambiente que você está.

Além de instalar, você precisa saber qual o usuário padrão do postgres no seu computador e é necessário criar uma senha para ele.

No passo a passo abaixo você pode encontrar o que precisa para toda essa instalação.

<details>
<summary>Windows</summary>

### Windows

1. **Baixar o instalador:**
    - Acesse o site oficial do PostgreSQL: <https://www.postgresql.org/download/>
    - Selecione Windows e baixe o instalador.
2. **Instalar o PostgreSQL:**
    - Execute o instalador baixado.
    - Siga os passos do instalador e mantenha as configurações padrão.
    - Anote a senha do usuário `postgres` que você definir durante a instalação.
3. **Executar o PostgreSQL:**
    - Abra o `pgAdmin` ou o `SQL Shell (psql)` que foram instalados com o PostgreSQL.
    - Para o `SQL Shell (psql)`, insira a senha do usuário `postgres` quando solicitado.
4. **Verificar usuário e alterar senha:**
    - No `SQL Shell (psql)`, insira os seguintes comandos:

        ```sql
        \\du  -- Lista os usuários
        ALTER USER postgres PASSWORD 'nova_senha';
        
        ```
</details>

<details>
<summary>macOS</summary>

### macOS

1. **Usar Homebrew para instalar:**
    - Se ainda não tiver o Homebrew instalado, instale-o com:

        ```
        /bin/bash -c "$(curl -fsSL <https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh>)"
        ```

    - Instale o PostgreSQL:

        ```
        brew install postgresql
        ```

2. **Iniciar o PostgreSQL:**
    - Inicie o serviço do PostgreSQL:

        ```
        brew services start postgresql
        ```

3. **Executar o PostgreSQL:**
    - Acesse o `psql`:

        ```
        psql postgres
        ```

4. **Verificar usuário e alterar senha:**
    - No `psql`, insira os seguintes comandos:

        ```sql
        \\du  -- Lista os usuários
        ALTER USER postgres PASSWORD 'nova_senha';
        ```
</details>

<details>
<summary>Linux</summary>

### Linux

1. **Usar o gerenciador de pacotes para instalar:**
    - **Debian/Ubuntu:**

        ```
        sudo apt update
        sudo apt install postgresql postgresql-contrib
        ```

    - **Fedora:**

        ```
        sudo dnf install postgresql-server postgresql-contrib
        sudo postgresql-setup --initdb
        ```

    - **CentOS/RHEL:**

        ```
        sudo yum install postgresql-server postgresql-contrib
        sudo postgresql-setup initdb
        ```

2. **Iniciar o PostgreSQL:**
    - **Debian/Ubuntu:**

        ```
        sudo systemctl start postgresql
        sudo systemctl enable postgresql
        ```

    - **Fedora/CentOS/RHEL:**

        ```
        sudo systemctl start postgresql
        sudo systemctl enable postgresql
        ```

3. **Executar o PostgreSQL:**
    - Acesse o `psql`:

        ```
        sudo -i -u postgres
        psql
        ```

4. **Verificar usuário e alterar senha:**
    - No `psql`, insira os seguintes comandos:

        ```sql
        \\du  -- Lista os usuários
        ALTER USER postgres PASSWORD 'nova_senha';
        ```

</details>

</details>

## Dependencias do projeto

Abra o terminal na pasta do projeto e digite:

```bash
$ npm install
```

## Variáveis de ambiente

Duplique o arquivo `.env.example`, retire o `.example` e implemente as variáveis, no arquivo `.env`:

```ts
DATABASE_URL='postgresql://SEU-USER:SUA-SENHA@localhost:5432/dnc_hotel?schema=public'
JWT_SECRET='ADICIONE-UMA-CHAVE-SHA256'
SMTP='smtps://SEU-GMAIL:SUA-SENHA-DE-APP@smtp.gmail.com'
EMAIL_USER='SEU-GMAIL'
REDIS_HOST='localhost'
REDIS_PORT=6379
```

## Migrações do banco de dados

Abra o terminal na pasta do projeto e digite:


```bash
npm run migration:run
```
Agora crie o cliente do Prisma

```bash
npm run prisma:generate
```

## Rodando o app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Stay in touch

- Author - [Thiago Lima](https://www.linkedin.com/in/thicode/)
- Website - [thicode.com.br](https://www.thicode.com.br/links)

## License

Nest is [MIT licensed](LICENSE).
