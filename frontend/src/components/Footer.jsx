export default function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="footer__inner">
        <div>
          <h3 className="footer__heading">Poções &amp; Soluções</h3>
          <p className="footer__text">
            Beco da Última Saída — Diagon Alley
            <br />
            Fundada em 1867
          </p>
        </div>
        <div>
          <h3 className="footer__heading">Contato</h3>
          <p className="footer__text">
            Coruja: merigold@pocoesesolucoes.bruxo
            <br />
            Lareira (Flu): Pó de Flu nº 1867
            <br />
            Telefone trouxa: (11) 1867-1867
          </p>
        </div>
      </div>
      <p className="footer__legal">
        © {new Date().getFullYear()} Poções &amp; Soluções. Todos os direitos
        reservados. Beba com responsabilidade mágica.
      </p>
    </footer>
  );
}
