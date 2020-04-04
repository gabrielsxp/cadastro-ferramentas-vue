import { LocalStorage } from 'quasar'
import Notification from 'src/mixins/Notification'

export default {
  mixins: [Notification],
  data () {
    return {
      data: null,
      tools: null,
      mine: false
    }
  },
  methods: {
    cadastrarUsuario (username, password) {
      const users = LocalStorage.getItem('users')
      const user = {
        id: 0,
        username: username,
        password: password,
        tools: []
      }
      if (users.length === 0) {
        let allUsers = []
        allUsers = [...allUsers, user]
        LocalStorage.set('users', JSON.stringify(allUsers))
        this.notify('success', 'Usuário Cadastrado com sucesso !')
        this.data = allUsers
      } else {
        let allUsers = JSON.parse(users)
        const id = allUsers[allUsers.length - 1].id
        user.id = id + 1
        allUsers = [...allUsers, user]
        LocalStorage.set('users', JSON.stringify(allUsers))
        this.data = allUsers
      }
    },
    deletarUsuario (id) {
      const users = JSON.parse(LocalStorage.getItem('users'))
      const index = users.findIndex((user) => user.id === id)
      if (index !== -1) {
        users.splice(index, 1)
        if (users.length === 0) {
          LocalStorage.remove('users')
          LocalStorage.set('users', [])
          this.data = []
        } else {
          LocalStorage.set('users', JSON.stringify(users))
          this.data = users
        }
      } else {
        this.notify(null, 'Usuário não encontrado !')
        return
      }
      this.notify('success', 'Usuário deletado com sucesso')
    },
    listaUsuarios () {
      const users = JSON.parse(LocalStorage.getItem('users'))
      console.log(users)
      this.data = users
    },
    realizarLogin (username, password) {
      const users = JSON.parse(LocalStorage.getItem('users'))
      const user = users.find((user) => {
        let match = null
        if (user.username === username && user.password === password) {
          match = user
        }
        return match
      })
      if (user) {
        LocalStorage.set('user', JSON.stringify(user))
        this.notify('success', 'Redirecionando...')
        window.setTimeout(() => {
          this.$router.push({ name: 'painel' })
        }, 2000)
      } else {
        this.notify('error', 'Dados incorretos !')
      }
    },
    deslogar () {
      LocalStorage.set('user', null)
      this.$router.go({ name: 'home' })
    },
    usuarioAtual () {
      return JSON.parse(LocalStorage.getItem('user'))
    },
    cadastrarFerramenta () {
      const tools = LocalStorage.getItem('tools')
      console.log(this.value)
      const tool = {
        id: 0,
        name: this.name,
        value: this.value,
        available: true,
        rentId: null,
        type: this.value === 'R$ 0,00/dia' ? 'Empréstimo' : 'Aluguel',
        userId: JSON.parse(LocalStorage.getItem('user')).id
      }
      if (tools.length === 0) {
        let allTools = []
        allTools = [...allTools, tool]
        LocalStorage.set('tools', JSON.stringify(allTools))
        this.notify('success', 'Ferramenta Cadastrada com sucesso !')
        this.tools = allTools.filter((tool) => tool.userId === this.usuarioAtual().id)
      } else {
        let allTools = JSON.parse(tools)
        const id = allTools[allTools.length - 1].id
        tool.id = id + 1
        allTools = [...allTools, tool]
        LocalStorage.set('tools', JSON.stringify(allTools))
        this.tools = allTools.filter((tool) => tool.userId === this.usuarioAtual().id)
      }
    },
    deletarFerramenta (id) {
      const tools = JSON.parse(LocalStorage.getItem('tools'))
      const index = tools.findIndex((user) => user.id === id)
      if (index !== -1) {
        tools.splice(index, 1)
        if (tools.length === 0) {
          LocalStorage.remove('tools')
          LocalStorage.set('tools', [])
          this.tools = []
        } else {
          LocalStorage.set('tools', JSON.stringify(tools))
          this.tools = tools
          this.tools = tools.filter((tool) => tool.userId === this.usuarioAtual().id)
        }
      } else {
        this.notify(null, 'Ferramenta não encontrada !')
        return
      }
      this.notify('success', 'Ferramenta deletada com sucesso')
    },
    todasFerramentas () {
      const tools = JSON.parse(LocalStorage.getItem('tools'))
      return tools.filter((tool) => tool.userId === this.usuarioAtual().id)
    },
    todasFerramentasAluguel (mine) {
      const tools = JSON.parse(LocalStorage.getItem('tools'))
      if (mine) {
        return tools.filter((tool) => tool.rentId === this.usuarioAtual().id)
      }
      return tools.filter((tool) => tool.available && tool.userId !== this.usuarioAtual().id)
    },
    alugarFerramenta (id) {
      let tools = LocalStorage.getItem('tools')
      const users = LocalStorage.getItem('users')
      const user = this.usuarioAtual()

      if (tools.length > 0 && users.length > 0) {
        tools = JSON.parse(tools)
        const toolId = tools.findIndex((tool) => tool.id === id)
        if (toolId !== -1) {
          if (!tools[toolId].available) {
            this.notify('error', 'Ferramenta já alugada !')
            return
          }
          tools[toolId].rentId = user.id
          tools[toolId].available = false
          this.mine = !this.mine
          LocalStorage.set('tools', JSON.stringify(tools))
          this.notify('success', 'Ferramenta alugada com sucesso !')
        } else {
          this.notify(null, 'Ferramenta já alugada !')
        }
      }
    },
    devolverFerramenta (id) {
      let tools = LocalStorage.getItem('tools')
      const users = LocalStorage.getItem('users')

      if (tools.length > 0 && users.length > 0) {
        tools = JSON.parse(tools)
        const toolId = tools.findIndex((tool) => tool.id === id)
        if (toolId !== -1) {
          tools[toolId].rentId = null
          tools[toolId].available = true
          this.mine = !this
          LocalStorage.set('tools', JSON.stringify(tools))
          this.notify('success', 'Ferramenta devolvida com sucesso !')
        } else {
          this.notify(null, 'Ferramenta indisponível !')
        }
      }
    },
    ferramentasDisponeives () {
      const tools = this.todasFerramentas()
      return tools.filter((tool) => tool.available)
    }
  }
}
