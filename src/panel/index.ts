import "angular";

const app = angular.module("iml", []);

/**
 * После того, как модуль создан, можно заявлять "наши" сервисы.
 * В иной последовательности будет зихер.
 */
import "./serviceILST";

interface MainScope extends ng.IScope {
  /**
   * Выполнить что-либо на стороне ILST
   */
  go(): void;
}

const ctrlMain = ($scope: MainScope, ILST: ILSTService) => {
  /**
   * Собираемся выполнить на стороне ILST метод `docCloser`, без параметров.
   */
  const command: CEPCommand = {
    handler: "docCloser",
  };

  $scope.go = () => {
    ILST.dispatch(command);
  }
}

/**
 * Отметимся в Ангуляре как контроллер
 */
app.controller("ctrlMain", ["$scope", "ILST", ctrlMain]);
