export function padTo2Digits(num: number) {
    return String(num).padStart(2, '0');
  }

export function getHoraAtual() {
    let hoje = new Date(Date.now())
    const hoursAndMinutes = padTo2Digits(hoje.getHours()) + ':' + padTo2Digits(hoje.getMinutes());
    return hoursAndMinutes
}
