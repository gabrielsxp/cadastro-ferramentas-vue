<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <span class="cursor-pointer" @click="$router.push({ name: 'home' })">
            Início
          </span>
        </q-toolbar-title>

        <div v-if="usuarioAtual()">
          <q-btn-dropdown no-caps flat :label="`Olá, ${usuarioAtual().username}`">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-avatar icon="edit" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  Alterar Senha
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="deslogar">
                <q-item-section avatar>
                  <q-avatar icon="exit_to_app" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  Deslogar
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Todas as opções
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import core from 'src/mixins/core'
export default {
  name: 'MainLayout',
  mixins: [core],
  components: {
    EssentialLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      user: null,
      essentialLinks: [
        {
          title: 'Inicio',
          caption: 'Veja todas as opções de ferramentas disponíveis',
          icon: 'house',
          link: 'home'
        },
        {
          title: 'Painel',
          caption: 'Cadastre suas ferramentas',
          icon: 'add',
          link: 'painel'
        },
        {
          title: 'Cadastros',
          caption: 'Cadastre usuários',
          icon: 'perm_identity',
          link: 'cadastro'
        }
      ]
    }
  }
}
</script>
