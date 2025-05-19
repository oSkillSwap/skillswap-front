import PageTransition from '../../utils/PageTransition';

function ErrorPage404() {
  return (
    <main className="container">
      <section className="content">
        <h1>Error: 404</h1>
      </section>
    </main>
  );
}

export default PageTransition(ErrorPage404);
