# App

Gympass style app

## RFs (Requisitos funcionais)

- [X] Deve ser possivel se cadastrar;
- [X] Deve ser possivel se authenticar;
- [X] Deve ser possivel obter o perfil de um usuario logado;
- [X] Deve ser possivel obter o numero de check-ins realizados pelo usuario;
- [X] Deve ser possivel o usuario obter seu historico de check-ins;
- [X] Deve ser possivel o usuario buscar academias proximas (até 10km) ;
- [X] Deve ser possivel o usuario buscar academias pelo nome;
- [X] Deve ser possivel o usuario realizar check-in em uma academia;
- [X] Deve ser possivel validar o check-in de um usuario;
- [X] Deve ser possivel cadastrar uma academia
## RNs (Regras de negocio)

- [X] O usuario não deve poder se cadastrar com um email duplicado;
- [X] O usuario não deve poder fazer check-in no mesmo dia;
- [X] O usuario não pode fazer check-in se não estiver perto(100m) da academia;
- [X] O check-in só pode ser valido até 20 minutos depois de criado;
- [X] O check-in só pode ser validado por administradores;
- [X] A academia só podo ser cadastrada por administradores;
## RNFs (Requesitos não funcionais)
- [X] A senha do usuario precisa estar criptografado;
- [X] Os dados da aplicação precisam estar presistidos em um banco PostgreSQL;
- [X] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [X] O usuario deve ser identificado por um JWT (JSON Web Token)   