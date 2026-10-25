export function DayCard(datos) {
  var nombreDia = datos.nombreDia;
  var fechaTexto = datos.fechaTexto;
  var esHoy = datos.esHoy;
  var claseHoy = esHoy ? "today" : "";

  return "<section class=\"day-card " + claseHoy + "\">" +
      "<header class=\"day-card-header\">" +
        "<h2 class=\"day-title\">" + nombreDia + "</h2>" +
        "<span class=\"day-date\">" + fechaTexto + "</span>" +
      "</header>" +
      "<div class=\"task-list\"></div>" +
    "</section>";
}