import {describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import CardTitle from '../components/CardTitle.vue'

describe('realizando testes de montagem do componente card title', () => {
    test('montando o componente e verificando props', () => {
        const wrapper = mount(CardTitle, {
            props: {
                title: 'Filme',
                plot: 'Plot',
                runtime: '90 min',
                type: 'movie',
                year: '2021',
                poster: 'url-teste',
                showAdd: true,
            }
        })

        const img = wrapper.find('.rounded-t-lg').element

        expect(wrapper.text()).toContain('Adicionar')
        expect(wrapper.text()).toContain('Ano: 2021')
        expect(wrapper.text()).toContain('90 min')
        expect(wrapper.text()).toContain('Plot')
        expect(wrapper.text()).toContain('movie')
        expect(img.getAttribute('src')).toContain('url-teste')
    })
})