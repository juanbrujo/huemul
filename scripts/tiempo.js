// Description:
//   Obtiene info del tiempo desde wttr.in y muestra solo las condiciones actuales.
//
// Dependencies:
//   None
//
// Commands:
//   hubot tiempo|weather|clima - Obtiene el tiempo de Santiago
//   hubot tiempo <ciudad> - Obtiene el tiempo de la ciudad indicada
//
// Author:
//   @jorgeepunan

module.exports = robot => {
  robot.respond(/(clima|weather|tiempo)\s?(.*)/i, msg => {
    const defaultCity = 'Santiago, Chile'
    let city = msg.match[2].trim() || defaultCity

    city = city.toLowerCase() === 'santiago' ? defaultCity : city

    robot
      .http(`https://wttr.in/${encodeURIComponent(city)}?m&T`)
      .header('Accept', '*/*')
      .header('User-Agent', 'curl/7.43.0')
      .get()((err, res, body) => {
        if (err || res.statusCode !== 200 || !body || /sorry/gi.test(body)) {
          if (err) robot.emit('error', err, msg, 'tiempo')
          return msg.reply('ocurrió un error con la búsqueda')
        }

        const lines = body.split('\n')
        // Cortar justo antes de las tablas de forecast
        const forecastIdx = lines.findIndex(line => line.includes('┌─────────────┐'))
        const result = (forecastIdx === -1 ? lines : lines.slice(0, forecastIdx))
          .join('\n')
          .replace(/\x1b\[[0-9;]*m/g, '')  // limpiar códigos ANSI por si acaso
          .trimEnd()

        msg.send('```' + result + '```')
      })
  })
}
