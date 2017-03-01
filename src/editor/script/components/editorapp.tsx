module GALLERY.Editor {


    export function EditorApp(props) {


        return (
            <div>
                <form id="select-gallery">
                    <div className="popup">
                        <div className="header">Administrace virtuálních galerií</div>
                        <p>Založte novou galerii napsáním jejího názvu a přístupového hesla k ní:</p>
                        <div>
                            <label>Galerie:</label>
                            <input type="text" name="gallery" pattern="([a-z]|[A-Z]|[0-9]|-|\.){2,150}"
                                   title="Zadejte název pouze z písmen, čísel, teček a pomlček, který má 2-150 znaků."/>
                        </div>
                        <div>
                            <label>Heslo:</label>
                            <input type="password" name="password" required/>
                        </div>
                        <input type="submit" name="submit" defaultValue="Vstoupit"/>
                        <p>Nebo klikněte na už existující galerii a upravte ji (pokud k ní máte přístupové heslo):</p>
                        <ul />
                        <a href="/">
                            <button>Procházet jednotlivé galerie</button>
                        </a>
                    </div>
                </form>
                <main>
                    <section id="admin-world-parts">
                        <div id="admin-world">
                        </div>
                        <canvas id="admin-world-canvas" width={200} height={100}/>
                    </section>
                    <div id="dot"/>
                    <div id="selected-toolbox">
                        {/*<i class="delete fa fa-trash" aria-hidden="true"></i>
                         <i class="resize fa fa-square" aria-hidden="true"></i>
                         <i class="rotate fa fa-circle" aria-hidden="true"></i>*/}
                    </div>
                </main>
                <div id="save"/>
                <nav id="menu-left">
                    <fieldset className="palette" id="selected-properties">
                    </fieldset>
                </nav>
                <nav id="menu-right">
                    <fieldset className="palette" id="admin-tools">
                        <legend>Akce</legend>
                        <ul>
                            <li onClick={GALLERY.Editor.compile}>Kompilovat a spustit</li>
                            <li onClick={GALLERY.Editor.previewHTML}>Spustit</li>

                            <li onClick={logout}>Odhlásit se</li>
                            <li onClick={GALLERY.Editor.exportJSON}>Exportovat</li>
                            <li onClick={GALLERY.Editor.exportJSONCompiled}>Exportovat kompilované</li>


                            <li onClick={cleanStorey}>Vyčistit patro</li>
                            <li onClick={cleanWorld}>Vyčistit svět</li>
                            <li onClick={copyStorey}>Kopírovat patro</li>

                        </ul>
                    </fieldset>
                    <fieldset className="palette">
                        <legend>Prostor</legend>
                        <fieldset className="select-worlds">
                            <legend>Svět</legend>
                            <ul />
                        </fieldset>
                        <fieldset className="select-storeys">
                            <legend>Podlaží</legend>
                            <ul />
                        </fieldset>
                        <fieldset className="select-zooms">
                            <legend>Zoom</legend>
                            <ul />
                        </fieldset>
                    </fieldset>
                    <fieldset className="palette">
                        <legend>Budova</legend>
                        <fieldset className="select-materials">
                            <legend>Materiály</legend>
                            <fieldset className="select-textures">
                                <legend>Textury</legend>
                            </fieldset>
                            <fieldset className="select-colors">
                                <legend>Barvy</legend>
                                <input type="color"/><br />
                            </fieldset>
                        </fieldset>
                        <fieldset className="select-shapes">
                            <legend>Tvary</legend>
                        </fieldset>
                        <fieldset className="select-opacity">
                            <legend>Neprůhlednost</legend>
                        </fieldset>
                    </fieldset>
                    <fieldset className="palette select-dot-objects">
                        <legend>Předměty</legend>
                        {/*<div class="light" title="Světlo"><i class="fa fa-sun-o" aria-hidden="true"></i></div>
                         <div class="label" title="Odkaz"><i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i></div>
                         <div class="tree" title="Strom"><i class="fa fa-pagelines" aria-hidden="true"></i></div>
                         <div class="stairs" title="Schody"><i class="fa fa-level-up" aria-hidden="true"></i></div>
                         <div class="key" title="Klíč"><i class="fa fa-key" aria-hidden="true"></i></div>*/}
                    </fieldset>
                </nav>
                <section className="top-panel">
                    <div id="message-zone">
                    </div>
                </section>
            </div>

        )


    }


}
