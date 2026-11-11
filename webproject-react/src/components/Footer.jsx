// Підвал сайту
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">
          © 2026 «Хвиля» — навчальний проєкт з дисципліни «Вебтехнології та вебдизайн».
          <br />
          Автор: Хорошилова Анна, група 5-ІПБ
        </p>
        <nav className="footer__nav" aria-label="Посилання проєкту">
          <a className="footer__link" href="https://github.com/AnnaKhoro/webproject-khoroshylova">Репозиторій</a>
          <a className="footer__link" href="https://github.com/AnnaKhoro/webproject-khoroshylova/blob/main/docs/tz.md">Технічне завдання</a>
        </nav>
      </div>
    </footer>
  );
}
