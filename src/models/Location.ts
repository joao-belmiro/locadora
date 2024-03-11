interface Location {
    cliente: Client;
    filmes: string[];
    dataLocacao: Date;
    dataEntrega: Date;
    usuarioLocacao: User;
    status: 'alugado' | 'entregue';
}