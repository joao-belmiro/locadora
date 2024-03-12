import { beforeEach, describe, expect, test, vi } from 'vitest'
import { getCep } from '../services/viaCepService'
import axios from 'axios'
vi.mock('axios')
const mockAxios = axios as vi.Mocked<typeof axios>

describe('get cep via cep', () => {
    test('mockando um gep para pegar as informações do cep', async () => {
      const cepMock = {
        cep: '66080210',
        logradouro: 'Avenida Paulista',
        bairro: 'Jardins',
        localidade: 'São Paulo',
        uf: 'SP',
      }

      mockAxios.get.mockResolvedValue({
        data: cepMock,
      })

      const cep = await axios.get('https://viacep.com.br/ws/66080210/json').then(res => res.data);
      expect(axios.get).toBeCalledWith('https://viacep.com.br/ws/66080210/json')
      expect(cep).toStrictEqual(cepMock)
    })
})