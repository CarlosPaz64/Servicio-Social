HTML:
```
<!DOCTYPE html>
<!---Coding By CodingLab | www.codinglabweb.com--->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <!--<title>Registration Form in HTML CSS</title>-->
    <!---Custom CSS File--->
    <link rel="stylesheet" href="/stylesEstatus.css" />
  </head>
  <body>
    <section class="container">
      <header>Formulario - Estatus</header>
      <form action="/formularioEstatus" class="form" method="post">
        <div class="column">
          <div class="input-box">
            <label>Folio</label>
            <input type="number" placeholder="Número de folio" name="num_folio" />
          </div>
          <div class="input-box">
            <label>ID Único</label>
            <input type="number" placeholder="ID" name="id_unico" />
          </div>
        </div>

        <div class="input-box">
          <label>Clave Única de Registro Poblacional</label>
          <input type="text" placeholder="CURP" name="curp" />
        </div>

        <div class="input-box">
          <label>Nombre completo</label>
          <input type="text" placeholder="Nombre completo" name="fullname" />
        </div>

        <div class="input-box">
          <label for="tramite"></label>
          <input type="hidden" name="estatus" id="tramite" value="estatus" />
        </div>

        <div class="input-box">
          <label>Comentarios</label>
          <textarea name="comentario" id="" cols="30" rows="10" style="resize: none;" placeholder="Notas"></textarea>
        </div>
      

        <button>Enviar</button>
      </form>
    </section>
  </body>
</html>
```
CSS: 
```
.form :where(.input-box textarea,) {
  position: relative;
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 1rem;
  color: #707070;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0 15px;
}
.input-box textarea:focus {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
```
