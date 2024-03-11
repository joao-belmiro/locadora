interface User {
    id: number;
    nome: string;
    documento: string;
    senha: string;
    status: 'ativo' | 'inativo';
}
