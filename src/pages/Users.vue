<template>
  <q-page>
    <div class="container q-pa-md">
      <div class="row">
        <div class="col-12">
          <p class="text-h6">Cadastrar Usuário</p>
        </div>
        <div class="col-12">
          <q-form @submit="cadastrarUsuario(username, password)">
            <div class="row q-col-gutter-xs flex items-center">
              <div class="col-xs-12 col-sm-6 col-md-4">
                <q-input
                  dense
                  label="Nome de usuário"
                  type="text"
                  outlined
                  bg-color="white"
                  v-model="username"
                  :rules="[
                    (val) =>
                      val.length >= 6 ||
                      'O nome deve ter ao menos 6 caracteres !',
                  ]"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <q-input
                  v-model="password"
                  outlined
                  bg-color="white"
                  :type="showPassword ? 'text' : 'password'"
                  dense
                  class="q-my-md"
                  label="Senha"
                  :rules="[
                    (val) =>
                      val.length >= 6 ||
                      'A senha deve ter ao menos 6 caracteres !',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="showPassword ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <q-btn
                  class="q-mb-lg"
                  type="submit"
                  label="Cadastrar"
                  rounded
                  color="primary"
                />
              </div>
            </div>
          </q-form>
          <div class="col-12 q-my-md">
            <q-btn
              label="Limpar Tudo"
              color="negative"
              icon="delete"
              @click="
                $q.localStorage.remove('users');
                $q.localStorage.set('users', []);
              "
            />
          </div>
          <q-table
            title="Lista de Usuários"
            :data="data"
            :columns="columns"
            row-key="name"
            hide-bottom
            v-if="data.length > 0"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="id" :props="props">
                  {{ props.row.id }}
                </q-td>
                <q-td key="username" :props="props">
                  {{ props.row.username }}
                </q-td>
                <q-td key="password" :props="props">
                  {{ props.row.password }}
                </q-td>
                <q-td key="tools" :props="props">
                  {{ props.row.tools.length }}
                </q-td>
                <q-td key="edit" :props="props">
                  <q-btn size="sm" round color="primary" icon="edit"></q-btn>
                </q-td>
                <q-td key="delete" :props="props">
                  <q-btn
                    size="sm"
                    @click="deletarUsuario(props.row.id)"
                    round
                    color="negative"
                    icon="close"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <div class="col-12" v-else>
            <p class="text-h6">Lista de usuários vazia</p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import core from 'src/mixins/core'
export default {
  mixins: [core],
  data () {
    return {
      username: '',
      password: '',
      showPassword: false,
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          sortable: true
        },
        {
          name: 'username',
          required: true,
          label: 'Nome',
          align: 'left',
          sortable: true
        },
        {
          name: 'password',
          align: 'left',
          label: 'Senha',
          field: 'password',
          require: true,
          sortable: false
        },
        {
          name: 'tools',
          align: 'left',
          label: 'Ferramentas Cadastradas',
          field: 'tools',
          sortable: true
        },
        {
          name: 'edit',
          align: 'left',
          label: 'Editar',
          field: 'edit',
          sortable: false
        },
        {
          name: 'delete',
          align: 'left',
          label: 'Excluir',
          field: 'edit',
          sortable: false
        }
      ],
      data: []
    }
  },
  created () {
    this.listaUsuarios()
  }
}
</script>

<style>
hr {
  border: none;
  border-top: 1px solid #ebebeb;
  margin: 20px 0;
}
</style>
