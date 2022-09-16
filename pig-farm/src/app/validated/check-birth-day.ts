import {AbstractControl} from '@angular/forms';

function dateDiff(first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

function parseDate(str: string) {
  const dmy = str.split('/');
  return new Date(Number(dmy[0]), Number(dmy[1]) - 1, Number(dmy[2]));
}

export function checkBirthDay(control: AbstractControl) {
  const birthDay = new Date(control.value);

  if (dateDiff(birthDay, new Date()) < 365 * 18 || dateDiff(birthDay, new Date()) > 365 * 100) {
    return {checkAge: true};
  }
  return null;
}

export function checkDay(control: AbstractControl) {
  const birthDay = new Date(control.value);
  const now = new Date();

  if (dateDiff(birthDay, now) <= 0) {
    return {checkDay: true};
  }
  return null;
}
