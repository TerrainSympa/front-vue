<template>
  <q-layout view="hHh lpR fff">

    <q-header elevated class="bg-primary text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div class="row items-center">
            <div class="col col-md-auto">
              <img
                  :src="logoLong"
                  alt="TerrainSympa.fr"
                  style="width:200px;" />
            </div>
            <div class="col">
              {{$t('main.title')}}
            </div>
          </div>
        </q-toolbar-title>

        <q-btn v-if="donationReady" flat @click="toggleDonation">
          Faire un don
          <q-badge color="red" rounded floating>!</q-badge>
        </q-btn>
        <q-btn flat round dense icon="help" @click="toggleLayer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered @scroll="onScroll">
      <SearchForm :is-on-top="isOnTop" />
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered style="overflow: hidden; display: flex; padding-bottom: 250px">
      <Parcelle/>
    </q-drawer>

    <q-page-container style="padding-top: 0">
      <q-dialog
          v-model="openLayer"
          full-height
      >
        <q-card class="column full-height" style="width: 700px; max-width: 80vw;">

          <q-card-section>
            <div class="row items-center">
              <div class="col col-md-auto">
                <div class="text-h5" style="padding-right: 5px">Bienvenue sur</div>
              </div>
              <div class="col col-md-auto">
                <img
                    :src="logoLong"
                    alt="TerrainSympa.fr"
                    style="width:200px;" />
              </div>
              <div class="col">
                <div class="text-h5" style="padding-left: 5px"> ! </div>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="col q-pt-none">
            <p style="color:red">⚠️ <strong>La base de donnée est actuellement en cours de conception. Les données actuelles sont fictives.</strong>⚠️ </p>
            <p><strong>terrainsympa.fr</strong> est un moteur de recherche de parcelles cadastrales en France.</p>

            <p class="text-justify">L'objectif de ce site est de vous offrir tout les outils nécessaire pour trouver votre terrain sympa, que ce soit pour rechercher une parcelle qui correspond à vos besoin ou pour trouver la parcelle d'une annonce immobilière par exemple.</p>
            <p class="text-justify">
              Pour cela, le site dispose actuellement des fonctionnalités suivantes:
            </p>
            <dl>
              <dd class="text-justify">
                • Rechercher les parcelles dans <strong>Toute la France métropolitaine</strong>.
              </dd>
              <dd class="text-justify">
                • Rechercher les parcelles dans une zone ou un code postale donné en fonction de leur caractéristique: taille, bâtiments, PLU (Plan Local d'Urbanisme), forêts et rivières
              </dd>
              <dd class="text-justify">
                • Afficher les informations relatives à chaque parcelle: son adresse, sa superficie, son PLU, ses bâtiments, ses forêts, ses rivières, les coordonnées de la mairie (indispensable pour connaitre le propriétaire de la parcelle)
              </dd>
            </dl>

            <p class="text-justify">Le site est actuellement <strong>en developpement</strong> (bénévolement par l'équipe !), bien d'autres fonctionnalités reste à être implémentées !</p>

            <p v-if="donationReady" class="text-justify">
              Vous pouvez <strong>soutenir le projet</strong> en faisant un <a href="#" @click="openDonation = true">don via le bouton FAIRE UN DON en haut à droite</a>.
              Tout les dons serviront exclusivement à la maintenance et à l'amélioration du site, que se soit pour des nouvelles fonctionnalités ou pour l'ajout de nouveaux département dans la recherche.
            </p>

            <p v-if="donationReady" class="text-justify">
              Un autre moyen de soutenir le projet est d'en parler autour de vous ! C'est tout aussi important que l'aide financière !
            </p>
            <p v-else class="text-justify">
              Le meilleur moyen de soutenir le projet est d'en parler autour de vous !
            </p>
            <p class="text-justify">
              Vous pouvez nous rejoindre sur notre <a href="https://discord.gg/DvrwxNH74t">serveur discord</a> pour suggérer des améliorations.
            </p>
            <p>
              Contactez nous par mail (<a href="mailto: support@terrainsympa.fr">support@terrainsympa.fr</a>) ou par notre <a href="https://discord.gg/DvrwxNH74t">serveur discord</a>.
            </p>
            <p class="text-justify">
              Merci d'avoir pris le temps de lire cette petite annonce et bonne recherche !
            </p>
            <p>
              <em>L'équipe de terrainsympa.fr</em>
            </p>

            <img
                :src="logoSquare"
                alt="TS"
                style="width:50px;" />

          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup @click="disableLayer" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog
          v-model="openDonation"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Donation</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p>Vous souhaitez faire un don ? Vous pouvez le faire via <a href="#">paypal</a> ou via <a href="#">tipee</a>. </p>
            <p>
              Tout les dons serviront exclusivement à la maintenance et à l'amélioration du site, que se soit pour des nouvelles fonctionnalités ou pour l'ajout de nouveaux département dans la recherche.
            </p>
            <p class="text-justify">
              Un autre moyen de soutenir le projet est d'en parler autour de vous !
            </p>
            <p>L'équipe vous remercie !</p>
            <img
                :src="logoSquare"
                alt="TS"
                style="width:50px;" />
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          <div class="tw-flex tw-justify-center">
            <a class="tw-transition-opacity tw-duration-300 tw-m-2 tw-opacity-70 hover:tw-opacity-100" href="https://discord.gg/DvrwxNH74t"
               target="_blank">
              <img
                  :src="logoDiscord"
                  alt="Discord"
                  style="width:40px;" />
            </a>
            <a class="tw-transition-opacity tw-duration-300 tw-m-2 tw-opacity-70 hover:tw-opacity-100" href="mailto:support@terrainsympa.fr" target="_blank">
              <img
                  :src="logoEmail"
                  alt="Mail"
                  style="width:40px;" />
            </a>
          </div>
          <div style="text-align: center">
            <img
                :src="logoShort"
                alt="TerrainSympa.fr"
                style="width:150px;" />
            </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import Footer from './components/Footer.vue'
import SearchForm from './components/SearchForm.vue'
import Parcelle from "@/views/Parcelle.vue";
import LogoLongSrc from '@/assets/logo_long.svg'
import LogoShortSrc from '@/assets/logo_short.svg'
import DiscordSrc from '@/assets/discordwp.webp'
import EmailSrc from '@/assets/mail.png'
import LogoSquareSrc from '@/assets/logo_square.svg'
import {computed} from "@vue/runtime-core";

const leftDrawerOpen = ref(false)
const openLayer = ref(!localStorage.getItem('showLayer'))
const openDonation = ref(false)
const donationReady = ref(false)
const logoLong = computed(() => LogoLongSrc)
const logoShort = computed(() => LogoShortSrc)
const logoDiscord = computed(() => DiscordSrc)
const logoEmail = computed(() => EmailSrc)
const logoSquare = computed(() => LogoSquareSrc)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const rightDrawerOpen = ref(false)

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function toggleLayer () {
  openLayer.value = !openLayer.value
}
function toggleDonation () {
  openDonation.value = !openDonation.value
}

function disableLayer () {
  localStorage.setItem('showLayer', 'false')
}

const isOnTop = ref(true)

function onScroll({ target: { scrollTop }}) {
  isOnTop.value = scrollTop === 0
}

</script>
