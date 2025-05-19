import PageTransition from '../../utils/PageTransition';
import './static.scss';

function PrivacyPolicy() {
  return (
    <main className="static container">
      <section className="content">
        <h1>Politique de confidentialité</h1>
        <p className="updated-at">Dernière mise à jour : 19 mai 2025</p>

        <h2>1. Préambule</h2>
        <p>
          Le site <strong>SkillSwap</strong> est un projet fictif à vocation
          pédagogique, développé dans le cadre de la formation Développeur Web
          et Web Mobile (DWWM) dispensée par{' '}
          <a href="https://oclock.io/" target="_blank" rel="noreferrer">
            O'Clock
          </a>
          . Il respecte les principes du Règlement Général sur la Protection des
          Données (RGPD).
        </p>

        <h2>2. Données collectées</h2>
        <p>
          Lors de votre utilisation de la plateforme SkillSwap, les données
          suivantes peuvent être collectées :
        </p>
        <ul>
          <li>
            <strong>Données d’identification :</strong> adresse e-mail et mot de
            passe (chiffré avec Argon2)
          </li>
          <li>
            <strong>Données liées au profil :</strong> description, compétences,
            disponibilités, image de profil
          </li>
          <li>
            <strong>Données d’échange :</strong> messages privés, avis,
            commentaires, notes
          </li>
          <li>
            <strong>Données techniques :</strong> cookies (strictement
            nécessaires à l’authentification)
          </li>
        </ul>

        <h2>3. Finalités du traitement</h2>
        <p>Les données personnelles sont utilisées dans les buts suivants :</p>
        <ul>
          <li>Création et gestion du compte utilisateur</li>
          <li>Affichage du profil public</li>
          <li>Mise en relation entre utilisateurs</li>
          <li>Authentification et sécurité</li>
          <li>Récupération du mot de passe par e-mail</li>
        </ul>

        <h2>4. Base légale</h2>
        <p>
          Le traitement des données repose sur les bases légales suivantes :
        </p>
        <ul>
          <li>Consentement lors de l’inscription et acceptation des CGU</li>
          <li>
            Intérêt légitime à assurer la sécurité du site et le bon
            fonctionnement de la plateforme
          </li>
        </ul>

        <h2>5. Durée de conservation</h2>
        <ul>
          <li>
            Les données sont conservées tant que le compte utilisateur reste
            actif.
          </li>
          <li>
            L’utilisateur peut demander la suppression de son compte à tout
            moment.
          </li>
          <li>
            Les logs techniques ne sont pas conservés à long terme (détail non
            défini dans ce projet fictif).
          </li>
        </ul>

        <h2>6. Partage des données</h2>
        <p>
          Aucune donnée personnelle n’est partagée avec des tiers, en dehors de
          l’hébergement technique assuré par AWS (instance EC2) et la gestion du
          nom de domaine par OVH. Aucune donnée n’est transmise à ces
          prestataires à des fins commerciales.
        </p>

        <h2>7. Cookies</h2>
        <p>
          Pour plus d’informations, veuillez vous référer à la section
          <strong> "Cookies" </strong> des{' '}
          <a href="/mentions-legales">mentions légales</a>.
        </p>

        <h2>8. Sécurité des données</h2>
        <p>
          Le site met en œuvre les mesures techniques suivantes pour garantir la
          sécurité des données :
        </p>
        <ul>
          <li>Chiffrement des mots de passe via l’algorithme Argon2</li>
          <li>Accès restreint par rôles et authentification</li>
          <li>
            Sécurisation des échanges entre client et serveur via des requêtes
            contrôlées (Axios, Zod, Sanitize)
          </li>
          <li>
            Stockage des données dans une base PostgreSQL installée sur une
            instance EC2 sécurisée
          </li>
          <li>Utilisation de Socket.IO pour la messagerie</li>
        </ul>

        <h2>9. Droits des utilisateurs</h2>
        <p>Conformément au RGPD, chaque utilisateur dispose des droits :</p>
        <ul>
          <li>Droit d’accès, de rectification et de suppression</li>
          <li>Droit d’opposition et de retrait du consentement</li>
          <li>
            Droit d’introduire une réclamation auprès de la CNIL (
            <a href="https://www.cnil.fr/" target="_blank" rel="noreferrer">
              www.cnil.fr
            </a>
            )
          </li>
        </ul>
        <p>
          Pour toute demande concernant l’exercice de vos droits, veuillez vous
          adresser à l’équipe pédagogique de la formation DWWM –{' '}
          <a href="https://oclock.io/" target="_blank" rel="noreferrer">
            O'Clock
          </a>
          .
        </p>
      </section>
    </main>
  );
}

export default PageTransition(PrivacyPolicy);
