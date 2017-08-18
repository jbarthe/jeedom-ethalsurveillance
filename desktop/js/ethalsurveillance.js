
/* This file is part of Jeedom.
 *
 * Jeedom is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Jeedom is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Jeedom. If not, see <http://www.gnu.org/licenses/>.
 */


//$("#table_cmd").sortable({axis: "y", cursor: "move", items: ".cmd", placeholder: "ui-state-highlight", tolerance: "intersect", forcePlaceholderSize: true});
/*
 * Fonction pour l'ajout de commande, appellé automatiquement par plugin.template
 */


$('body').on( 'click','.bt_selectCmdExpression', function() {
    var el = $(this).closest('.input-group').find('.eqLogicAttr');
    jeedom.cmd.getSelectModal({cmd: {type: ''},eqLogic: {eqType_name : ''}}, function (result) {
         el.value(result.human);
    });
});

$('.eqLogicAttr[data-l1key=configuration][data-l2key=cmdequipementtype]').on('change', function () {
    $('.cmdequipementtype').hide();
    $('.cmdequipementtype.' + $(this).value()).show();

    if ($(this).value() == 'analogique') {
        if ($('.eqLogicAttr[data-l1key=configuration][data-l2key=general]').value()==1) {
            $('.cmdequipementtype.logique.not_general').hide();            
            $('.cmdequipementtype.' + $(this).value()+'.not_general').hide();
            $('.cmdequipementtype.' + $(this).value()+'.general').show();
        } else {
            $('.cmdequipementtype.' + $(this).value()+'.general').hide();
            $('.cmdequipementtype.logique.not_general').show();            
            $('.cmdequipementtype.' + $(this).value()+'.not_general').show();
        }
    }

});

$('.eqLogicAttr[data-l1key=configuration][data-l2key=general]').on('change',function () {
    $('.cmdequipementtype').hide();    
    $('.cmdequipementtype.' + $('.eqLogicAttr[data-l1key=configuration][data-l2key=cmdequipementtype]').value()).show();
    

    if(this.checked) {
        $('.cmdequipementtype.logique.not_general').hide();            
        $('.cmdequipementtype.' + $('.eqLogicAttr[data-l1key=configuration][data-l2key=cmdequipementtype]').value()+'.not_general').hide();
        $('.cmdequipementtype.' + $('.eqLogicAttr[data-l1key=configuration][data-l2key=cmdequipementtype]').value()+'.general').show();
    } else {
        $('.cmdequipementtype.' + $('.eqLogicAttr[data-l1key=configuration][data-l2key=cmdequipementtype]').value()+'.general').hide();
        $('.cmdequipementtype.logique.not_general').show();            
        $('.cmdequipementtype.' + $('.eqLogicAttr[data-l1key=configuration][data-l2key=cmdequipementtype]').value()+'.not_general').show();
    }
});

function addCmdToTable(_cmd) {
    if (!isset(_cmd)) {
        var _cmd = {configuration: {}};
    }
    if (!isset(_cmd.configuration)) {
        _cmd.configuration = {};
    }
    var tr = '<tr class="cmd" data-cmd_id="' + init(_cmd.id) + '">';
    tr += '<td>';
    tr += '<span class="cmdAttr" data-l1key="id" style="display:none;"></span>';
    tr += '<span class="cmdAttr" data-l1key="name"></span>';
    tr += '</td>';
    tr += '<td>';
    tr += '<span class="cmdAttr" data-l1key="type"></span>';
    tr += '<br/>';
    tr += '<span class="cmdAttr" data-l1key="subType"></span>';
    tr += '</td>';
    tr += '<td>';
    tr += '<span><label class="checkbox-inline"><input type="checkbox" class="cmdAttr checkbox-inline" data-l1key="isVisible" checked/>{{Afficher}}</label></span> ';
    if (_cmd.subType == 'numeric') {
        tr += '<span><label class="checkbox-inline"><input type="checkbox" class="cmdAttr checkbox-inline" data-l1key="isHistorized" checked/>{{Historiser}}</label></span> ';
    }
    tr += '</td>';
    tr += '<td>';
    if (is_numeric(_cmd.id)) {
        tr += '<a class="btn btn-default btn-xs cmdAction expertModeVisible" data-action="configure"><i class="fa fa-cogs"></i></a> ';
        tr += '<a class="btn btn-default btn-xs cmdAction" data-action="test"><i class="fa fa-rss"></i> {{Tester}}</a>';
    }
    tr += '</td>';
    tr += '</tr>';
    $('#table_cmd tbody').append(tr);
    $('#table_cmd tbody tr:last').setValues(_cmd, '.cmdAttr');
    if (isset(_cmd.type)) {
        $('#table_cmd tbody tr:last .cmdAttr[data-l1key=type]').value(init(_cmd.type));
    }
    jeedom.cmd.changeType($('#table_cmd tbody tr:last'), init(_cmd.subType));
}