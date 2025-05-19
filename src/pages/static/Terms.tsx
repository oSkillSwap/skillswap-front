import PageTransition from '../../utils/PageTransition';
import './static.scss';

function Terms() {
  return (
    <main className="static container">
      <section className="content">
        <h1>Conditions Générales d’Utilisation (CGU)</h1>
        <p className="updated-at">Dernière mise à jour : 19 mai 2025</p>

        <h2>1. Objet</h2>
        <p>
          Les présentes Conditions Générales d’Utilisation (CGU) ont pour objet
          de définir les modalités d’accès et d’utilisation de la plateforme
          fictive SkillSwap, développée dans le cadre de la formation
          Développeur Web et Web Mobile (DWWM) dispensée par l’organisme de
          formation{' '}
          <a href="https://oclock.io/" target="_blank" rel="noreferrer">
            O'Clock
          </a>
          .
        </p>
        <p>
          SkillSwap permet à ses utilisateurs d’échanger des compétences de
          manière collaborative dans un cadre pédagogique.
        </p>

        <h2>2. Accès au service</h2>
        <p>
          L’accès à certaines fonctionnalités du site nécessite la création d’un
          compte utilisateur. L'inscription est ouverte à toute personne majeure
          (âgée de plus de 18 ans), bien qu'aucun contrôle d’âge ne soit
          actuellement mis en œuvre. Aucune validation manuelle ou automatique
          des inscriptions n’est exigée.
        </p>

        <h2>3. Fonctionnalités proposées</h2>
        <p>La plateforme SkillSwap permet notamment :</p>
        <ul>
          <li>de compléter son profil (compétences, disponibilités, etc.) ;</li>
          <li>de publier des annonces d’échange de compétences ;</li>
          <li>de postuler aux annonces d’autres utilisateurs ;</li>
          <li>d’échanger via une messagerie instantanée intégrée ;</li>
          <li>
            de laisser un avis à la fin d’un échange (note + commentaire) ;
          </li>
          <li>d’ajouter des profils à ses favoris.</li>
        </ul>

        <h2>4. Responsabilités des utilisateurs</h2>
        <p>
          Les utilisateurs s’engagent à adopter un comportement respectueux et à
          ne pas publier de contenus illicites, offensants ou inappropriés.
        </p>
        <p>
          Ils sont seuls responsables des contenus publiés (images de profil,
          descriptions, annonces, commentaires), et doivent s’assurer qu’ils
          disposent des droits nécessaires pour utiliser les éléments soumis.
        </p>
        <p>
          Tout manquement peut entraîner la suspension ou la suppression du
          compte utilisateur, sans préavis.
        </p>

        <h2>5. Contenus générés par les utilisateurs</h2>
        <p>
          Les utilisateurs conservent la propriété intellectuelle des contenus
          qu’ils publient sur la plateforme. L’équipe projet décline toute
          responsabilité quant à leur usage ou leur véracité.
        </p>

        <h2>6. Modération et sanctions</h2>
        <p>
          Un compte administrateur dispose de droits d’administration complets.
          Aucun système de modération automatisée ou tiers n’est encore en
          place, mais pourrait être envisagé dans de futures versions.
        </p>
        <p>
          En cas de non-respect des présentes CGU, les administrateurs peuvent
          désactiver ou supprimer un compte à leur seule discrétion.
        </p>

        <h2>7. Engagements de l’équipe projet</h2>
        <p>
          SkillSwap étant un projet fictif à visée pédagogique, aucune garantie
          de service, de performance, de disponibilité ou de sécurité n’est
          offerte. Le site est fourni "en l’état", à des fins de démonstration
          uniquement.
        </p>

        <h2>8. Propriété intellectuelle</h2>
        <p>
          Le code source, le design et la marque SkillSwap sont développés dans
          un cadre open source non protégé. Toute réutilisation est libre, sous
          réserve du respect des bonnes pratiques liées à l’open source.
        </p>

        <h2>9. Suspension de compte</h2>
        <p>
          Les administrateurs se réservent le droit de suspendre ou supprimer un
          compte utilisateur en cas de non-respect des présentes CGU ou d’usage
          abusif de la plateforme.
        </p>

        <h2>10. Loi applicable</h2>
        <p>
          Les présentes conditions sont régies par le droit français. En cas de
          litige, les juridictions compétentes seront celles du ressort du
          Tribunal de Paris, sauf disposition légale contraire.
        </p>
      </section>
    </main>
  );
}

export default PageTransition(Terms);
