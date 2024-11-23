import moment from 'moment'

moment.locale('pt-br')

function parseDateFromDDMMYYYY(date: any) {
  return moment(date).format('DD/MM/YYYY')
}

function getCurrentDateTime() {
  return moment().format('YYYY-MM-DDTHH:mm')
}

function getCurrentDateToFormatYYYYMMDD() {
  return moment().format('YYYY-MM-DD')
}

function currentDate() {
  return moment()
}

function getNameMonth(month: any) {
  return moment().month(month).format('MMMM')
}

export {
  parseDateFromDDMMYYYY,
  currentDate,
  getNameMonth,
  getCurrentDateTime,
  getCurrentDateToFormatYYYYMMDD
}