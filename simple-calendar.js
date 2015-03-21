//<![CDATA[
/**
 * Simple Calendar
 *
 * @author  Jose SAYAGO
 * @email   jose.sayago@laelite.info
 * @url 	https://github.com/josesayago
 */
var _dayLabels 	= {};
var _dayNames 	= ['Su','Mo','Tu','We','Th','Fr','Sa'];
var _monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var _monthFullNames = {
	'Jan': 'January', 
	'Feb': 'February',
	'Mar': 'March',
	'Apr': 'April',
	'May': 'May',
	'Jun': 'June',
	'Jul': 'July',
	'Aug': 'August',
	'Sep': 'September',
	'Oct': 'October',
	'Nov': 'November',
	'Dec': 'December'
};
/**
 * Main Calendar Function
 *
 * Receives the number of previous months to display
 * along with the current one. If none provided, the last
 * three are displayed.
 *
 * @param _months integer
 * @return HTML
 */
function _setCalendar( _months ) {
	// Parameters
	var _months 	= ( _months != '' && _months > 0 ) ? _months : 3;
	var _now 		= new Date();
	var _calendar 	= {};
	var _firstDay 	= {};
	var _monthYears = {};
	var _matrix 	= [];
	var _prevMonths, _monthDays, _flag, _month, _days;
	var _core 		= _months;
	// Get number of days in current month
	var _daysNow 	= new Date( _now.getYear(), _now.getMonth()+1, 0 ).getDate();
	// Set object with number of days by month
	_calendar[ _monthNames[ _now.getMonth() ] ] = _daysNow;
	// Get first day of each month
	_firstDay[ _monthNames[ _now.getMonth() ] ] = new Date( _now.getFullYear(), _now.getMonth(), 1 ).getDay();
	// Get day names
	_dayName( _daysNow, _now, _monthNames );
	// Get years for each month
	_monthYears[ _monthNames[ _now.getMonth() ] ] = _now.getFullYear();
	// Get previous months
	for( _flag = 1; _flag <= _months; _flag++ ) {
		_prevMonths 	= new Date( _now.setMonth( _now.getMonth() - _flag ) );
		_monthDays 		= new Date( _prevMonths.getYear(), ( _prevMonths.getMonth() + 1 ), 0 ).getDate();
		_calendar[ _monthNames[ _prevMonths.getMonth() ] ] = _monthDays;
		_dayName( _monthDays, _prevMonths, _monthNames );
		_monthYears[ _monthNames[ _now.getMonth() ] ] = _prevMonths.getFullYear();
		_firstDay[ _monthNames[ _prevMonths.getMonth() ] ] = new Date( _prevMonths.getFullYear(), _prevMonths.getMonth(), 1 ).getDay();
		_now 			= new Date( _now.setMonth( _now.getMonth() + _flag ) );
	}
	// Month Matrix
	for( _month in _calendar ) {
		var _day 		= 1;
		var _thisDay = new Date()
		_matrix[_core] = '<table class="table-calendar">';
			_days = _calendar[_month];
			_matrix[_core]+= '<thead>';
				_matrix[_core]+= '<tr>';
					_matrix[_core]+= '<th class="cal-head" colspan="7">';
						_matrix[_core]+= _monthFullNames[_month] + ' ' + _monthYears[_month];
					_matrix[_core]+= '</th>';
				_matrix[_core]+= '</tr>';
				for( _flag = 1; _flag <= 7; _flag++ ) {
					if( _flag % 7 == 1 ) { _matrix[_core]+= '<tr>'; }
					_matrix[_core]+= '<th class="cal-day" data-day="'+_dayNames[ _flag-1 ]+'">';
						_matrix[_core]+= _dayNames[ _flag-1 ];
					_matrix[_core]+= '</th>';
					if( _flag % 7 == 0 ) { _matrix[_core]+= '</tr>'; }
				}
			_matrix[_core]+= '</thead>';
			_matrix[_core]+= '<tbody>';
			_rows 		= 6;
			_cols 		= 7;
			_day 		= 1;
			_dayLast 	= false;
			// Days matrix
			for( var _x = 0; _x < _rows; _x++ ) {
				_matrix[_core]+= '<tr>';
				for( var _y = 0; _y < _cols; _y++ ) {
					if( _firstDay[_month] > 0 ) {
						_matrix[_core]+= '<td class="cal-none">&nbsp;</td>';
						_y+_firstDay[_month];
						_firstDay[_month]--;
						if( _day < _days ) _day--;
					} else {
						if( _day == _days && _dayLast == true ) {
							_matrix[_core]+= '<td class="cal-none">&nbsp;</td>';
						} else {
							if( _month == _monthNames[_thisDay.getMonth()] && _day == _thisDay.getDate() ) {
								_matrix[_core]+= '<td class="cal-today"><span>'+_day+'</span></td>';
							} else {
								_matrix[_core]+= '<td class="cal-date"><span>'+_day+'</span></td>';
							}
							if( _day == _days ) _dayLast = true;
						}
					}
					if( _day < _days ) _day++;
				}
				_matrix[_core]+= '</tr>';
			}
			_matrix[_core]+= '</tbody>';
		_matrix[_core]+= '</table>';
		_core--;
	}
	// Display Calendar
	for( _flag = 0; _flag < _matrix.length; _flag++ ) {
		document.getElementById( 'simple-calendar' ).innerHTML += _matrix[_flag];
	}
}
/**
 * Day Names
 *
 * Get name for any given name
 *
 * @params _monthDays date object
 * @params _prevMonths date object
 * @params _monthNames array
 * @reutrn _dayLabels array
 */
function _dayName( _monthDays, _prevMonths, _monthNames ) {
    for( _flag = 1; _flag <= _monthDays; _flag++ ) {
		var _now = new Date( _prevMonths.getFullYear(), _prevMonths.getMonth(), _flag );
		if( !_dayLabels[ _monthNames[ _prevMonths.getMonth() ] ] ) { _dayLabels[ _monthNames[ _prevMonths.getMonth() ] ] = {}; }
		_dayLabels[ _monthNames[ _prevMonths.getMonth() ] ][_flag] = _dayNames[ _now.getDay() ];
	}
	return _dayLabels;
}
//]]>