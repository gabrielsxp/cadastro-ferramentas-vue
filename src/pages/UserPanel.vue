<template>
  <q-page>
    <div class="container q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <p class="text-h6">Cadastrar Ferramenta</p>
          <p v-if="user" class="text-body">Olá, {{ user.username }}</p>
        </div>
        <div class="col-12">
          <q-form @submit="cadastrarFerramenta">
            <div class="row q-col-gutter-md flex items-center">
              <div class="col-xs-12 col-sm-6 col-md-4">
                <q-input
                  dense
                  label="Ferramenta"
                  type="text"
                  outlined
                  bg-color="white"
                  hint="Nome da ferramenta"
                  v-model="name"
                  :rules="[
                    (val) =>
                      val.length >= 6 ||
                      'O nome deve ter ao menos 3 caracteres !',
                  ]"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <q-field
                  v-model="value"
                  label="Valor"
                  bg-color="white"
                  outlined
                  color="primary"
                  dense
                  type="text"
                  hint="Se o valor for zero, será considerado como empréstimo"
                >
                  <template
                    v-slot:control="{ id, floatingLabel, value, emitValue }"
                  >
                    <input
                      :id="id"
                      class="q-field__input text-left"
                      :value="value"
                      @change="(e) => emitValue(e.target.value)"
                      v-money="moneyFormatForDirective"
                      v-show="floatingLabel"
                    />
                  </template>
                </q-field>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <q-btn
                  type="submit"
                  class="q-mb-lg"
                  label="Cadastrar"
                  rounded
                  color="primary"
                />
              </div>
            </div>
          </q-form>
          <hr />
          <div class="col-12 q-my-md">
            <q-btn color="negative" label="Remover tudo" icon="delete" @click="$q.localStorage.remove('tools'), $q.localStorage.set('tools', []), tools = []" />
            <q-table
              :title="`Lista de ferramentas`"
              :data="tools"
              :columns="columns"
              row-key="name"
              v-if="tools"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="id" :props="props">
                    {{ props.row.id }}
                  </q-td>
                  <q-td key="rentId" :props="props">
                    {{ props.row.rentId ? props.row.rentId : 'Ninguém' }}
                  </q-td>
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>
                  <q-td key="available" :props="props">
                    {{ props.row.available ? 'Sim' : 'Não' }}
                  </q-td>
                  <q-td key="value" :props="props">
                    {{ props.row.value }}
                  </q-td>
                  <q-td key="type" :props="props">
                    {{ props.row.type }}
                  </q-td>
                  <q-td key="edit" :props="props">
                    <q-btn size="sm" round color="primary" icon="edit"></q-btn>
                  </q-td>
                  <q-td key="delete" :props="props">
                    <q-btn
                      size="sm"
                      @click="deletarFerramenta(props.row.id)"
                      round
                      color="negative"
                      icon="close"
                    />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <div class="col-12" v-else>
              <p class="text-h6">Lista de ferramentas vazia</p>
            </div>
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
      user: null,
      name: '',
      value: '',
      moneyFormatForDirective: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '/dia',
        precision: 2,
        masked: false
      },
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          sortable: true
        },
        {
          name: 'rentId',
          required: true,
          label: 'Alugado por',
          align: 'left',
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Nome',
          align: 'left',
          sortable: false
        },
        {
          name: 'available',
          required: true,
          label: 'Disponível',
          align: 'left',
          sortable: false
        },
        {
          name: 'value',
          align: 'left',
          label: 'Valor',
          field: 'value',
          require: true,
          sortable: false
        },
        {
          name: 'type',
          align: 'left',
          label: 'Tipo',
          field: 'type',
          require: true,
          sortable: false
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
      ]
    }
  },
  created () {
    this.user = this.usuarioAtual()
    this.tools = this.todasFerramentas()
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
