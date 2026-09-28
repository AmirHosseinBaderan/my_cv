import { createRouter, createWebHistory } from 'vue-router';
import HomeScreen from '../screens/HomeScreen.vue';
import AboutScreen from '../screens/AboutScreen.vue';
import FocusScreen from '../screens/FocusScreen.vue';
import ProjectsScreen from '../screens/ProjectsScreen.vue';
import ExperienceScreen from '../screens/ExperienceScreen.vue';
import PrinciplesScreen from '../screens/PrinciplesScreen.vue';
import StackScreen from '../screens/StackScreen.vue';
import ResearchScreen from '../screens/ResearchScreen.vue';
import ReposScreen from '../screens/ReposScreen.vue';
import ContactScreen from '../screens/ContactScreen.vue';

const routes = [
  { path: '/', name: 'home', component: HomeScreen },
  { path: '/about', name: 'about', component: AboutScreen },
  { path: '/focus', name: 'focus', component: FocusScreen },
  { path: '/projects', name: 'projects', component: ProjectsScreen },
  { path: '/experience', name: 'experience', component: ExperienceScreen },
  { path: '/principles', name: 'principles', component: PrinciplesScreen },
  { path: '/stack', name: 'stack', component: StackScreen },
  { path: '/research', name: 'research', component: ResearchScreen },
  { path: '/repos', name: 'repos', component: ReposScreen },
  { path: '/contact', name: 'contact', component: ContactScreen },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});
