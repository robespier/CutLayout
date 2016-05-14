#IML Cut Layout

Моделирование раскладки контуров высечки для In-mould-этикеток.

##Цели

1. Упростить процесс создания раскладки контуров. Пользователю не нужно разбираться в инструментарии `Adobe Illustrator`, чтобы сверстать необходимый файл для предварительного просчета стоимости заказа и заказа высекательного штампа.
2. Уменьшить количество облоя материала за счет более эффективной раскладки контуров.
3. Уменьшить время прохождения заказа за счет автоматизации процесса раскладки контуров высечки.

##Задача

* Необходимо разработать программу моделирования оптимальной раскладки контуров высечек на вал (боковую поверхность цилиндра) с учетом заданных условий и технологических  требований.

##Условия

* Печатная машина: MPS
* Минимальная ширина пореза материала: 110 мм
* Максимальная ширина пореза материала: 410 (520) мм
* Для раскладки контуров можно использовать любые доступные валы для печатных машин Arsoma, RCS и MPS (см. таблицу оснастки), кроме тех, где нет магнита. По умолчанию берется вал D=140.

##Требования

* Раскладка состоит из двух частей: области заполнения и контуров высечки.
* Область заполнения представляет замкнутый многоугольник (в простом случае - прямоугольник). При сворачивании формы области заполнения в цилиндр, верхняя и нижняя части должны без разрывов и наложений стыковаться друг с другом.


* Область заполнения (ОЗ)

	* `ширина ОЗ` - это ширина пореза конкретного материала минус нерабочая область штампа (метка для MPS, одна или две рельсы).

	* `длина ОЗ` - длина окружности конкретного вала (в случае прямоугольной ОЗ) или длина окружности конкретного вала плюс длина выступающих частей ОЗ (для ОЗ непрямоугольной формы).

	* `нерабочая область штампа` включает такие элементы, как рельсы и метка для MPS. Размер нерабочей области задается пользователем в диапазопе от 12 до 20 мм. По умолчанию - 16 мм.

* Контуры высечки (КВ)

	* В качестве контуров могут выступать как стандартные геометрические фигуры (прямоугольник, квадрат, круг, овал, n-угольник, звезда и т.д.), так и пользовательские фигуры сложной формы (колье, "банан", "сабля", крест, капля и т.п). В общем случае, контуры представляют собой замкнутые направленные многоугольники (выпуклые и невыпуклые), описанные либо векторами, либо сплайнами Безье.

	* Частный случай №1: контур состоит из набора несвязанных векторов, которые предварительно необходимо собрать в направленный замкнутый многоугольник.
	* Частный случай №2: контур банановидной формы в исходном файле повернут под углом. Необходимо расположить его горизонтально, а потом уже делать раскладку.

	* На одном высекательном штампе может размещаться `n` контуров одной геометрической формы.

* Способы раскладки контуров:

	* регулярная раскладка на основе прямоугольной или треугольной сетки для контуров небольшого размера

	* нерегулярная раскладка (со смещением и/или поворотом элементов) для контуров большого размера, не умещающихся по габаритам в прямоугольную область раскладки.

* Технологические требования к контурам:

	* отступ на вылет этикетки задается пользователем в диапазоне от 1 до 3 мм.
	* необходимо избегать появления длинных горизонтальных порезов. Процент горизонтального пореза (по координате X) может составлять не более 25-30% от ширины области заполнения.
	* Исключение (и/или уменьшение) горизонтальных порезов можно достичь за счет поворота контура или смещением контуров по оси Y ("разрядка")
	* контуры (с учетом отступа) не должны пересекаться друг с другом
	* предпочтительна регулярная раскладка с явным количеством ручьев (полос)
	* при регулярной раскладке нескольких контуров по вертикали ручьи могут входить в область друг друга не более чем на 15-20% (опционально)
	* желательно полностью избегать наложения ручьев (чекбокс "Запретить наложение ручьев")
	* при наложении ручьев нужно обязательно информировать пользователя о сложности собирания этикеток в стопки на Shober при данной раскладке.

* Требования к области заполнения:

	* в случае непрямоугольной формы ОЗ, ее верхняя и нижняя часть представляют собой ломанную линию. Внешние углы между сегментами этой линии должны быть больше 90 и меньше 270 градусов. Это условие необходимо для корректного соединения ОЗ в цилиндр.
	* высота выступающей части ОЗ не должна превышать 50% от длины окружности вала.


* Необходимо предусмотреть сохранение различных вариантов раскладки для последующего сравнения и выбора оптимального варианта, а также спроектировать и реализовать инструмент для анализа этих вариантов (таблица, график?).

* Время работы алгоритма моделирования раскладок должно быть (по возможности) минимальным.

* Кроме раскладки контуров, программа должна формировать и выводить отчет по расходу материала для каждого варианта раскладки и углу поворота контура (-ов). Отчет может включать следующие данные:

	* количество необходимого материала (в квадратных и в погонных метрах), исходя из тиражности заказа (количество этикеток)
	* количество облоя материала (в процентах и в квадратных метрах)
	* угол поворота контуров раскладки (в градусах). В случае нерегулярной раскладки необходимо в отчете выводить информацию об угле поворота каждого отдельного контура.

##Реализация

* Необходимо разработать понятный и удобный интерфейс для решения основных задач пользователя:
	* предварительная раскладка контуров для просчета стоимости заказа (под разные порезы/валы)
	* окончательная раскладка (под конкретный порез/вал) для заказа высекательного штампа

* Предварительная раскладка - с минимумом входных параметров. Генерирует несколько вариантов раскладки, размещая их на разных Artboard-ах в одном документе. Рядом с каждым Artboard-ом создается текстовый блок (paragraph text) c report-ом по данному варианту раскладки (номер варианта раскладки, ширина пореза материала, длина штампа, расход материала и угол поворота контуров).
* Окончательная раскладка - с максимальным количеством входных параметров (тираж, тип этикетки, материал, порез, печатная машина, вал, размер отступа и т.д.). Генерирует один вариант раскладки на одном Artboard-е в одном документе. Репорт аналогично предварительной раскладке.

* Программа `IML Cut Layout` может быть реализована как расширение (extension) для `Adobe Illustrator CC 2015` (версия 19.1.0).

* В качестве входных данных (элементов пользовательского интерфейса) могут выступать следующие параметры:

	* тираж (шт.)
	* наименование/тип материала
	* ширина пореза материала (мм)
	* диаметр вала (мм)
	* размер отступа на вылет этикетки (мм)

* Предусмотреть возможность пользователю программы добавлять новые материалы/порезы и редактировать уже имеющиеся.
