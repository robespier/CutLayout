import "angular";

import { config } from "../config";
import { CSInterface } from "CSInterface";

const cs = new CSInterface();

/**
 * Обработчик ответа от ILST
 */
const responseHandler = (result) => {
  try {
    JSON.parse(result);
  } catch (err) {
    console.error(result, err);
  }
};

/**
 * Передаём команду в функцию `marshal` из контекста ILST.
 *
 * На той стороне маршал вытащит имя метода `docCloser` и выполнит его.
 * Результат исполнения `docCloser` отдастся тут responseHandler-у.
 */
const action = (command) => {
  const executor = `${config.connector}(${JSON.stringify(command)})`;
  cs.evalScript(executor, responseHandler);
};

const service = () => {
  return {
    execute(params) {
      action(params);
    }
  };
};

/**
 * Отметимся в Ангуляре как сервис
 */
angular.module("iml").factory("ILST", service);