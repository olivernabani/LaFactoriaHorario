# LaFactoriaHorario

# 🏭 La Factoría – Planificador Personalizable de Contenido

**La Factoría** es una herramienta web _offline‑first_ que te ayuda a organizar tu producción semanal de vídeos, directos y publicaciones en redes sociales.  
Sin dependencias externas, sin backend y 100 % personalizable: basta con clonar el repositorio y abrir `index.html` en tu navegador favorito.

---

## ✨ Características principales

| Funcionalidad | Descripción |
|--------------|-------------|
| 🚀 **Drag & Drop avanzado** | Arrastra tareas entre días y franjas horarias o _arrastra_ plantillas rápidas desde la paleta lateral. |
| 🖌️ **Edición rica** | Cambia título, descripción, icono (emoji) y color de cada tarea desde un modal intuitivo. |
| 🎨 **Temas claro/oscuro** | Cambia de tema con un clic; la preferencia se guarda en `localStorage`. |
| 💾 **Persistencia local + Export/Import** | Todo se guarda automáticamente en el navegador. Puedes exportar/ importar archivos JSON o convertir una semana en plantilla. |
| ⌨️ **Atajos de teclado** | Navega con ←/→, cambia de vista con `1`/`2`, crea semana con `Ctrl + N`, etc. |
| ⏱️ **Cálculo de horas** | Muestra las horas productivas por día y semana en tiempo real. |
| 📱 **Responsive** | Diseñado con CSS Grid y _neumorphism_ para verse bien de 4K a móvil. |

> Versión actual: **v3.0** (ver comentarios en `script.js`)

---

## 📂 Estructura del proyecto

```text
/
├─ index.html      # maqueta principal y contenedores
├─ styles.css      # tema oscuro/claro + responsive neumórfico
├─ script.js       # lógica, estado y drag & drop
├─ README.md       # este archivo 🙂
└─ LICENSE.txt     # licencia MIT
```

---

## 🛠️ Tecnologías empleadas

* **HTML5** semántico  
* **CSS3** con variables nativas y _glass‑/neu‑morphism_  
* **JavaScript ES6** (sin frameworks)  
* Almacenamiento en **localStorage**

---

## ⚙️ Instalación y uso

1. **Clona el repositorio**

```bash
git clone https://github.com/tu‑usuario/la‑factoria.git
cd la‑factoria
```

2. **Abre la app**

   *Método rápido:* haz doble clic en `index.html`.  
   *Método pro:* sirve la carpeta con cualquier servidor estático:

```bash
# usando el paquete http‑server de npm
npx http-server .
```

3. **(Opcional) Publica en GitHub Pages**

```
main ➜ gh-pages       # crea la rama
GitHub → Settings → Pages → Source: gh‑pages
```

---

## 🚀 Guía rápida de uso

| Acción | Gesto/Atajo |
|--------|-------------|
| Cambiar de semana | ← / → |
| Vista Horario / Publicaciones | `1` / `2` |
| Nueva semana | `Ctrl + N` |
| Guardar plantilla | `Ctrl + T` |
| Exportar / Importar | `Ctrl + S` / `Ctrl + O` |
| Copiar / Pegar tarea | `Ctrl + C` / `Ctrl + V` |
| Ayuda de teclado | `F1` o `?` |

1. **Configura tu plantilla base**  
   Ajusta los slots, colores e iconos en “Semana Template” y pulsa _💾 Guardar Template_.

2. **Crea una nueva semana**  
   Presiona `+` o `Ctrl + N`, elige la fecha de inicio y ¡listo!

3. **Arrastra tareas**  
   Desde la paleta (“🎨 Tareas Rápidas”) o entre celdas. La barra lateral ajusta su altura automáticamente.

4. **Haz _click_ para editar**  
   Cambia cualquier dato y guarda con **Enter**. `Shift + Enter` añade líneas en descripción.

---

## 📝 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---

## 👩‍💻 Autor

**Oliver Nabani**  

[YouTube](https://youtube.com/@olivernabani) · [Instagram](https://instagram.com/olivernabani)

