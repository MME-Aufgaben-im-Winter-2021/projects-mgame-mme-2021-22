/**
 * Lädt den Inhalt des Screens aus der angegebenen HTML-Datei
 * @param {String} templateFile URL zur HTML-Datei
 * @returns Ein Promise, das aufgelöst wird, sobald der Inhalt der angegebenen HTML-Datei vollständig geladen
 * ist. Als Ergebnis wird aus dem Promise ein HTML-Element (Node) zurückgegeben, dass dem Wurzelelement
 * aus der geladenen HTML-Datei entspricht.
 */
async function initFromTemplate(templateFile) {
  let tmp = document.createElement("div"),
    reponse = await fetch(templateFile),
    html = await reponse.text();
  tmp.innerHTML = html;
  return tmp.firstChild;
}

/**
 * Repräsentiert einen sichbaren Bildschirm der Anwendung. Die Anwendung besteht aus mehreren Screens,
 * die über den NavigationController verwaltet werden. Screens müssen initial einem Host-Element 
 * zugeordnet werden. Dabei handelt es sich um ein beliebiges HTML-Element, das mehrere Screens als
 * Kindelemente enthalten kann. Screens können sichtbar oder unsichtbar sein, der jeweilige Zustand kann
 * über öffentliche Methoden umgeschaltet werden. Spezifisches Verhalten einzelner Screens kann über
 * Callback-Methoden implementiert werden, die beim Zustandswechsel automatisch aufgerufen werden.
 */
class Screen {

  constructor(templateFile) {
    if (new.target === Screen) {
      throw new Error("Cannot construct Screen instances directly");
    }
    this.templateFile = templateFile;
    this.visible = false;
  }

  /**
   * Initialisiert das HTML-Element des Screens aus der im Konstruktor angegebenen HTML-Datei und fügt
   * dieses als Kindelement zum angegebenen Host-Element hinzu. Der Screen wird dabei verborgen.
   * @param {HTMLElement} host Host-Element, dass den Screen als Kindelement verwalten soll
   * @returns Ein Promise, das aufgelöst wurde, sobald der Screen vollständig initialisiert und zum 
   * Host hinzugefügt wurde.
   */
  async attachToHost(host) {
      let el = await initFromTemplate(this.templateFile);
      this.el = el;
      this.hide();
      host.appendChild(el);
      await this.init();
      return;
  }

  /**
   * Callback: Wird aufgerufen, wenn die HTML-Komponten des Screens erstellt und zum Host hinzugefügt wurde. Hier
   * können individuelle Initialisierungen des Screens erfolgen.
   */
  async init() {
    throw new Error("init not implemented in Subtype");
  }

  /**
   * Gibt true zurück, wenn der Screen aktuell sichtbar ist.
   */
  isVisible() {
      return this.visible;
  }

  /**
   * Macht den Screen sichtbar
   */
  show() {
    this.el.classList.remove("hidden");
    this.visible = true;
    this.onShow();
  }

  /**
   * Macht den Screen unsichtbar
   */
  hide() {
    this.el.classList.add("hidden");
    this.visible = false;
    this.onHide();
  }

  /**
   * Callback: Wird aufgerufen, wenn der Screen unsichtbar wird
   */
  onHide() {
    throw new Error("onHide not implemented in Subtype");
  }

  /**
   * Callback: Wird aufgerufen, wenn der Screen sichtbar wird
   */
  onShow() {
    throw new Error("onShow not implemented in Subtype");
  }

}

export default Screen;