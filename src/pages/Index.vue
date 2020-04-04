<template>
  <q-page class="home q-pa-md">
    <div class="container">
      <div class="row flex flex-center items-center" v-if="login">
        <q-card class="q-pa-md">
          <q-card-section>
            <p class="text-h6">Área Restrita</p>
            <p class="text-body">Preencha seus dados para continuar</p>
            <q-form @submit="realizarLogin(username, password)">
              <q-input
                v-model="username"
                outlined
                bg-color="white"
                label="Nome de Usuário"
                type="text"
                dense
              />
              <q-input
                v-model="password"
                outlined
                bg-color="white"
                :type="showPassword ? 'text' : 'password'"
                dense
                class="q-my-md"
                label="Senha"
              >
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
              <q-btn
                type="submit"
                style="width: 100%;"
                class="q-my-xs"
                filled
                rounded
                label="Enviar"
                color="primary"
              ></q-btn>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
      <div class="row q-col-gutter-md" v-else>
        <div class="col-12">
          <div class="text-h6">Todas as ferramentas disponíveis</div>
        </div>
        <div class="col-12">
          <q-toggle v-model="mine" label="Meus aluguéis" color="primary" />
        </div>
        <div
          class="col-xs-12 col-sm-4 col-md-3"
          v-for="(tool, index) in todasFerramentasAluguel(mine)"
          :key="index"
        >
          <div class="ferramenta q-pa-md">
            <q-icon class="icon" name="home_work" />
            <div class="row">
              <div class="col">
                <div>
                  <div class="text-h6">{{ tool.name }}</div>
                  <div class="text-body">{{ tool.value }}/<span>dia</span></div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 q-my-xs">
                <q-btn
                  color="white"
                  :label="
                    mine ? 'Devolver' : tool.value === 'R$ 0,00/dia' ? 'Emprestrar' : 'Alugar'
                  "
                  outline
                  rounded
                  no-caps
                  size="md"
                  @click="mine ? devolverFerramenta(tool.id) : alugarFerramenta(tool.id)"
                />
              </div>
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
  name: 'PageIndex',
  mixins: [core],
  data () {
    return {
      username: '',
      password: '',
      showPassword: false
    }
  },
  created () {
    if (this.usuarioAtual()) {
      this.login = false
      // this.$router.push({ name: 'painel' })
    } else {
      this.login = true
    }
  }
}
</script>

<style lang="scss">
.home {
  & .ferramenta {
    border-radius: 10px;
    background: $secondary;
    color: white;
    overflow: hidden;
    position: relative;
    font-size: 16px;
    transition: all 0.5s ease-out;
    transform: scale(1);
    cursor: pointer;
    &:hover {
      transform: scale(1.02);
      transition: all 0.5s ease-out;
    }
    & .text-h6 {
      font-weight: bold;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & .text-body {
      & span {
        font-size: 12px;
      }
    }
  }
  & .icon {
    font-size: 150px;
    color: rgba(white, 0.1);
    position: absolute;
    bottom: -20px;
    left: 0;
  }
}
</style>
