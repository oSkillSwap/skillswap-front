import PageTransition from '../../utils/PageTransition';
import './static.scss';

function Legals() {
  return (
    <main className="static container">
      <section className="content">
        <h1>Mentions légales</h1>
        <p className="updated-at">Dernière mise à jour : 19 mai 2025</p>

        <h2>1. Éditeur du site</h2>
        <p>
          Le site SkillSwap (accessible à l’adresse{' '}
          <a href="https://skillswap.olivier-renard.com">
            skillswap.olivier-renard.com
          </a>
          ) est un projet fictif développé dans le cadre de la formation
          Développeur Web et Web Mobile (DWWM) dispensée par l’organisme de
          formation{' '}
          <a href="https://oclock.io/" target="_blank" rel="noreferrer">
            O'Clock
          </a>
          .
        </p>

        <h3>Responsables de publication :</h3>
        <ul>
          <li>Olivier Renard</li>
          <li>Gregory Virmaud</li>
          <li>Erwan Mettouchi</li>
        </ul>
        <p>
          Ce site est strictement pédagogique et n’a aucune finalité commerciale
          ou professionnelle.
        </p>

        <h2>2. Hébergement</h2>
        <p>
          Le site est hébergé sur une instance EC2 d'Amazon Web Services (AWS),
          localisée dans la zone Francfort (Allemagne).
        </p>

        <h3>Hébergeur :</h3>
        <p>
          Amazon Web Services EMEA SARL 38 avenue John F. Kennedy, L-1855
          Luxembourg Site web :{' '}
          <a href="https://aws.amazon.com" target="_blank" rel="noreferrer">
            aws.amazon.com
          </a>
        </p>

        <h2>3. Nom de domaine</h2>
        <p>
          Le nom de domaine principal (sous-domaine){' '}
          <a href="https://skillswap.olivier-renard.com">
            skillswap.olivier-renard.com
          </a>{' '}
          est enregistré auprès de :
        </p>
        <p>
          OVH SAS 2 rue Kellermann, 59100 Roubaix, France - Site web :{' '}
          <a href="https://www.ovh.com" target="_blank" rel="noreferrer">
            www.ovh.com
          </a>
        </p>

        <h2>4. Propriété intellectuelle</h2>
        <p>
          Tous les contenus présents sur le site SkillSwap (textes, images,
          codes sources, maquettes) sont produits dans un cadre éducatif. Ils
          sont librement utilisables à des fins de formation, mais ne peuvent
          faire l’objet d’une exploitation commerciale sans autorisation
          préalable des auteurs.
        </p>

        <h2>5. Limitation de responsabilité</h2>
        <p>
          Les informations et fonctionnalités du site sont fictives et à
          vocation strictement pédagogique. Les auteurs ne sauraient être tenus
          responsables des éventuelles conséquences liées à l’usage, même
          partiel, des contenus mis à disposition.
        </p>

        <h2>6. Cookies</h2>
        <p>
          Le site SkillSwap utilise des cookies techniques strictement
          nécessaires à son fonctionnement, notamment pour la gestion des jetons
          d’authentification (refresh token). Aucune donnée n’est collectée à
          des fins de profilage, de publicité ou de statistiques. Aucun cookie
          tiers n’est utilisé.
        </p>
        <p>
          Conformément à la réglementation en vigueur (RGPD & ePrivacy), aucun
          consentement n’est requis pour ces cookies strictement nécessaires au
          service.
        </p>

        <h2>7. Contact</h2>
        <p>
          Aucune adresse de contact n’est disponible pour ce projet fictif. Pour
          toute question, veuillez vous adresser à l’équipe pédagogique de la
          formation DWWM –{' '}
          <a href="https://oclock.io/" target="_blank" rel="noreferrer">
            O'Clock
          </a>
          .
        </p>
      </section>
    </main>
  );
}

export default PageTransition(Legals);
