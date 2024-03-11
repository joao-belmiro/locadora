interface Client {
    id: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    celular: string;
    endereco: {
        cep: string;
        logradouro: string;
        bairro: string;
        cidade: string;
        uf: string;
    };
}
