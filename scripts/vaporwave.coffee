# Description:
#   Cambia el texto a vaporwave
#   Basado en https://github.com/dokshor/guru_guru
#
# Dependencies:
#   none
#
# Configuration:
#   none
#
# Commands:
#   hubot vapor <texto> - Traduce le texto al vaporwave
#
# Author:
#   @alvaroveliz

module.exports = (robot) ->
  robot.respond /vapor (.*)/i, (msg) ->

    letters = {
      "a": "ａ",
      "b": "ｂ",
      "c": "ｃ",
      "d": "ｄ",
      "e": "ｅ",
      "f": "ｆ",
      "g": "ｇ",
      "h": "ｈ",
      "i": "ｉ",
      "j": "ｊ",
      "k": "ｋ",
      "l": "ｌ",
      "m": "ｍ",
      "n": "ｎ",
      "ñ": "～",
      "o": "ｏ",
      "p": "ｐ",
      "q": "ｑ",
      "r": "ｒ",
      "s": "ｓ",
      "t": "ｔ",
      "u": "ｕ",
      "v": "ｖ",
      "w": "ｗ",
      "x": "ｘ",
      "y": "ｙ",
      "z": "ｚ",
      " ": "ｼ",
      "{": "ﾈ",
      "}": "ﾁ",
      "(": "ｱ",
      ")": "ｶ",
      "-": "ｵ",
      "_": "ﾒ"
    }

    str = []
    for letter in msg.match[1].toLowerCase().split("")
      if letters[letter]?
        str.push letters[letter]
      else
        str.push letter

    msg.send str.join("")
