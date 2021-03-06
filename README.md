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
* Высекальное оборудование ротационного типа: Shober
* Минимальная ширина пореза материала: 110 мм
* Максимальная ширина пореза материала: 410 мм
* Для раскладки контуров используется вал D=140 (длина окружности вала = 444,5 мм).

##Требования

* Раскладка состоит из двух частей: области заполнения и контуров высечки.
* Область заполнения представляет замкнутый многоугольник (в простом случае - прямоугольник). При сворачивании формы области заполнения в цилиндр, верхняя и нижняя части должны без разрывов и наложений стыковаться друг с другом.


* Область заполнения (ОЗ)

	* `ширина ОЗ` - это ширина пореза конкретного материала минус нерабочая область штампа (метка для печатной машины, одна или две рельсы).

	* `длина ОЗ` - длина окружности вала (в случае прямоугольной ОЗ) или длина окружности вала плюс длина выступающих частей ОЗ (для ОЗ непрямоугольной формы).

	* `нерабочая область штампа` включает такие элементы, как рельсы и метка для MPS. Размер нерабочей области задается пользователем в диапазопе от 12 до 20 мм. По умолчанию - 16 мм.

* Контуры высечки (КВ)

	* В качестве контуров могут выступать как стандартные геометрические фигуры (прямоугольник, квадрат, круг, овал, n-угольник, звезда и т.д.), так и пользовательские фигуры сложной формы (колье, "банан", "сабля", крест, капля и т.п). В общем случае, контуры представляют собой замкнутые направленные многоугольники (выпуклые и невыпуклые), описанные либо векторами, либо сплайнами Безье.

	* Частный случай №1: контур состоит из набора несвязанных векторов, которые предварительно необходимо собрать в направленный замкнутый многоугольник.
	* Частный случай №2: контур банановидной формы в исходном файле повернут под углом. Необходимо расположить его горизонтально, а потом уже делать раскладку.

	* На одном высекательном штампе может размещаться `n` контуров только одной геометрической формы.

* Способы раскладки контуров:

	* раскладка на основе прямоугольной сетки (для контуров небольшого размера)
	* раскладка со смещением и/или поворотом элементов (для контуров большого размера, не умещающихся по габаритам в прямоугольную область раскладки)
	* комбинация первого и второго способов

* Технологические требования к контурам:

	* отступ на вылет этикетки задается пользователем в диапазоне от 1 до 3 мм с шагом 0,1 мм.
	* необходимо избегать появления длинных горизонтальных порезов. Максимальный процент горизонтального пореза (по координате X) равен 40% от ширины вала (410 мм).
	* Исключение (и/или уменьшение) горизонтальных порезов можно достичь за счет поворота контура или смещением контуров по оси Y ("разрядка")
	* контуры (с учетом отступа) не должны пересекаться друг с другом
	* предпочтительна регулярная раскладка с явным количеством ручьев (полос)
	* наложения ручьев друг на друга недопустимо (исключение - произвольная раскладка).

* Требования к области заполнения:

	* в случае непрямоугольной формы ОЗ, ее верхняя и нижняя часть представляют собой ломанную линию. Внешние углы между сегментами этой линии должны быть больше 90 и меньше 270 градусов. Это условие необходимо для корректного соединения ОЗ в цилиндр.
	* высота выступающей части ОЗ не должна превышать 50% от длины окружности вала.


* Необходимо предусмотреть сохранение различных вариантов раскладки для последующего сравнения и выбора оптимального варианта.

* Время работы алгоритма моделирования раскладок должно быть (по возможности) минимальным.

* Кроме раскладки контуров, программа должна формировать и выводить отчет по расходу материала для каждого варианта раскладки и углу поворота контура (-ов). Отчет может включать следующие данные:

	* количество необходимого материала (в квадратных и в погонных метрах), исходя из тиражности заказа (количество этикеток)
	* количество облоя материала (в процентах и в квадратных метрах)
	* угол поворота контуров раскладки (в градусах). В случае произвольной раскладки необходимо в отчете выводить информацию об угле поворота каждого отдельного контура.
	* количество этикеток в раскладке
	* количество ручьев в раскладке

##Реализация

* Необходимо разработать понятный и удобный интерфейс для решения основных задач пользователя:
	* предварительная раскладка контуров для просчета стоимости заказа (под разные порезы материала)
	* окончательная раскладка (под конкретный порез материала) для заказа высекательного штампа

* Программный модуль генерирует несколько вариантов раскладки, размещая их на разных Artboard-ах в одном документе. Рядом с каждым Artboard-ом создается текстовый блок c report-ом по данному варианту раскладки (номер варианта раскладки, ширина пореза материала, длина штампа, расход материала, угол поворота контуров и др.).

* Программа `IML Cut Layout` может быть реализована как расширение (extension) для `Adobe Illustrator CC 2015` (версия 19.1.0).

* В качестве входных данных (элементов пользовательского интерфейса) могут выступать следующие параметры:

	* тираж (шт.)
	* наименование/тип материала
	* ширина пореза материала (мм)
	* размер отступа на вылет этикетки (мм)
	* размер нерабочей области (мм)
	* ограничительные параметры (наложение ручьев, поворот контура более чем на один угол)

* Предусмотреть возможность пользователю программы добавлять новые материалы/порезы и редактировать уже имеющиеся.
