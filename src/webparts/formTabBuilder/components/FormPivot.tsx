import * as React from 'react';
import { Web } from "@pnp/sp/presets/all";
import { tabs } from './definitions';
import TopMenu from './TopMenu';
import FormTab from './FormTab';
import FormButtons from './FormButtons';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

import './temp.css';


const mcc = 'color:yellow;';
const mcc2 = 'color:yellow;background-color:black;';


export interface FormTabsProps {
    web: string;
    list: string;
}

export interface FormTabsState {
    fields_state: any;
    visible_tabs: any;
    selected_tab: number;
    prev_tab: number;
    next_tab: number;
    tabs_state: any;
    vertical_tab_layout: boolean;
}

class FormTabs extends React.Component<FormTabsProps, FormTabsState> {
    constructor(props: FormTabsProps) {
        super(props);

        this.state = {
            fields_state: null,
            visible_tabs: [{ title: tabs.filter(t => t.show)[0].title, id: tabs.filter(t => t.show)[0].id }],
            selected_tab: 0,
            // selected_tab: tabs.filter(t => t.show)[0].id,
            prev_tab: null,
            next_tab: null,
            tabs_state: tabs,
            vertical_tab_layout: false
        };
        this.handler_tab = this.handler_tab.bind(this);
        this.handler_menus = this.handler_menus.bind(this);
        this.handler_pivot = this.handler_pivot.bind(this);
    }

    public componentDidMount() {
        this.getData_fields().then((fields: any) => {
            console.clear();
            console.log('%c : FormTabs -> componentDidMount -> fields', mcc, fields);
            this.setState({
                fields_state: fields
            });
        });
    }

    public componentDidUpdate(prevProps: FormTabsProps, prevState: FormTabsState) {
        console.log('%c : FormTabs -> componentDidUpdate -> this.state', mcc, this.state);

        const prev_tabs = prevState.visible_tabs;
        const new_tabs = this.state.visible_tabs;
        if (prev_tabs.length < new_tabs.length) {
            // console.log('%c : FormTabs -> componentDidUpdate -> TAB ADDED', mcc, new_tabs.length);

            const prev_vis_tab_ids = prev_tabs.map(p => { return p.id });
            // console.log('%c : FormTabs -> componentDidUpdate -> prev_vis_tab_ids', mcc, prev_vis_tab_ids);

            const new_tab = new_tabs.filter(v => prev_vis_tab_ids.indexOf(v.id) === -1)[0];
            // console.log('%c : FormTabs -> componentDidUpdate -> new_tab', mcc, new_tab);

            changePivotColor(new_tab.title);

        }
    }

    public getData_fields = () => new Promise(resolve => {
        const the_web = Web(this.props.web);
        the_web.lists.getByTitle(this.props.list).fields
            .filter("Hidden eq false and ReadOnlyField eq false and InternalName ne 'ContentType'")
            .select('TypeAsString', 'InternalName', 'Title', 'Required', 'Choices', 'Description')
            .get().then(fields => {
                resolve(fields);
            });
    })

    public handler_menus(event, button) {
        console.log('%c : Form -> handler_menus -> event', mcc, event);
        console.log('%c : Form -> handler_menus -> button', mcc, button);

        // const this_slide_index = 


        if (button == 'prev') {
            console.log('%c : FormTabs -> handler_menus -> this.state.selected_tab', mcc2, this.state.selected_tab);
            const new_selected_tab = getNextLowestIndex(this.state.visible_tabs, this.state.selected_tab);
            console.log('%c : FormTabs -> handler_menus -> new_selected_tab PREV', mcc2, new_selected_tab);
            if (new_selected_tab > -1)
                this.setState({
                    selected_tab: new_selected_tab,
                    prev_tab: getNextLowestIndex(this.state.visible_tabs, new_selected_tab),
                    next_tab: getNextHighestIndex(this.state.visible_tabs, new_selected_tab)
                });
        }

        else if (button == 'next') {
            const sel_tab = this.state.selected_tab;
            console.log('%c : FormTabs -> handler_menus -> sel_tab', mcc2, sel_tab);
            const new_selected_tab = getNextHighestIndex(this.state.visible_tabs, sel_tab);
            console.log('%c : FormTabs -> handler_menus -> new_selected_tab NEXT', mcc2, new_selected_tab);
            const new_next_tab = getNextHighestIndex(this.state.visible_tabs, new_selected_tab);
            console.log('%c : FormTabs -> handler_menus -> new_next_tab', mcc2, new_next_tab);
            if (new_selected_tab > -1)
                this.setState({
                    selected_tab: new_selected_tab,
                    prev_tab: sel_tab,
                    // prev_tab: getNextLowestIndex(this.state.visible_tabs, new_selected_tab),
                    next_tab: new_next_tab
                });
        }

        else if (button == 'layout') {
            this.setState({ vertical_tab_layout: !this.state.vertical_tab_layout });
        }


    }

    public handler_tab(field, value, checked) {
        console.log('%c : FormTabs -> handler_tab -> field', mcc2, field);
        console.log('%c : FormTabs -> handler_tab -> value', mcc2, value);
        console.log('%c : FormTabs -> handler_tab -> checked', mcc2, checked);


        if (field == 'Checklist') {
            const tab_id = this.state.tabs_state.filter(tb => tb.title == value)[0].id;
            // console.log('%c : FormTabs -> handler_tab -> tab_id', mcc2, tab_id);
            if (checked) {

                const vis_tabs = this.state.visible_tabs.concat({ title: value, id: tab_id });
                const next_t = getNextHighestIndex(vis_tabs, this.state.selected_tab);

                this.setState({
                    visible_tabs: vis_tabs,
                    next_tab: next_t
                });
            }
            else {
                const my_tab = this.state.tabs_state.filter(t => t.title == value)[0];
                // console.log('%c : FormTabs -> handler_tab -> my_tab', mcc, my_tab);
                const tab_index = this.state.visible_tabs.indexOf(this.state.visible_tabs.filter(ta => ta.id === my_tab.id)[0]);
                // console.log('%c : FormTabs -> handler_tab -> tab_index', mcc, tab_index);
                if (tab_index > -1) {
                    const new_tabs = this.state.visible_tabs.filter(n => n.id !== my_tab.id);
                    // console.log('%c : FormTabs -> handler_tab -> new_tabs', mcc, new_tabs);
                    this.setState({ visible_tabs: new_tabs });
                }
            }
        }
        else if (field == 'NoProfileYet') {
            const temp_state = JSON.parse(JSON.stringify(this.state.tabs_state));
            temp_state.filter(t => t.title == 'Start')[0]
                .sections[0].fields.filter(f => f.InternalName == 'EmployeeName')[0]
                .show = !checked;
            temp_state.filter(t => t.title == 'Start')[0]
                .sections[0].fields.filter(f => f.InternalName == 'EmployeeNameNoProfile')[0]
                .show = checked;
            this.setState({ tabs_state: temp_state });
        }
        else if (field == 'EmployeeType') {
            const temp_state = JSON.parse(JSON.stringify(this.state.tabs_state));
            const temp_tab = temp_state.filter(t => t.title == 'Start')[0];
            const temp_section = temp_tab && temp_tab.sections ? temp_tab.sections[1] : null; // hardcoded as the second section for this demo
            if (temp_section && temp_section.fields) {
                temp_section.fields.filter(f => f.InternalName == 'ChecklistHourly')[0]
                    .show = value == 'Hourly';
                temp_section.fields.filter(f => f.InternalName == 'ChecklistSalary')[0]
                    .show = value == 'Salary';
                temp_section.fields.filter(f => f.InternalName == 'ChecklistCorporate')[0]
                    .show = value == 'Corporate';
            }
            this.setState({ tabs_state: temp_state });
        }
    }

    private handler_pivot(item, event): void {
        console.log('%c : FormTabs -> handler_pivot -> item', mcc, item);
        console.log('%c : FormTabs -> handler_pivot -> event', mcc, event);
        const new_selected_tab = item.key.split('.$')[1];
        console.log('%c : FormTabs -> handler_pivot -> new_selected_tab', mcc, new_selected_tab);
        this.setState({
            selected_tab: new_selected_tab,
            prev_tab: getNextLowestIndex(this.state.visible_tabs, new_selected_tab),
            next_tab: getNextHighestIndex(this.state.visible_tabs, new_selected_tab)
        });
    }

    public render() {
        const { fields_state, visible_tabs, tabs_state, selected_tab } = this.state;

        const tabs_sorted = visible_tabs.sort((a, b) => {
            return a.id - b.id;
        });
        console.log('%c : FormTabs -> render -> tabs_sorted', mcc, tabs_sorted);


        const el_tabs = fields_state
            ? visible_tabs.map(v => {
                // console.log('%c : FormTabs -> render -> v', mcc, v);

                const my_tab = tabs_state.filter(t => t.id == v.id)[0];
                console.log('%c : FormTabs -> render -> my_tab', mcc, my_tab);
                if (my_tab && my_tab.sections) {
                    my_tab.sections.map(s => {
                        // console.log('%c : FormTabs -> render -> s', mcc2, s);
                        if (s.fields)
                            s.fields.map(f => {
                                // console.log('%c : FormTabs -> render -> f', mcc2, f);
                                const this_field = fields_state.filter(field => field.InternalName == f.InternalName)[0];
                                // console.log('%c : FormTabs -> render -> this_field', mcc2, this_field);
                                f['Description'] = this_field.Description || 'no description';
                                f['Required'] = this_field.Required;
                                f['Title'] = this_field.Title;
                                f['TypeAsString'] = this_field.TypeAsString;
                                f['Choices'] = this_field.Choices || null;
                            });
                    });
                    console.log('%c : FormTabs -> render -> my_tab', mcc2, my_tab);
                }
                else { console.log('no tab/section'); }
                return (
                    <PivotItem
                        headerText={my_tab.title}
                        key={my_tab.id}
                    // key={makeKey(my_tab.title)}
                    // onChange={e => console.log('onChange', e)}
                    // onClick={e => console.log('onClick', e)}
                    >
                        <FormTab
                            tab={my_tab}
                            handler={this.handler_tab}
                        />
                    </PivotItem>
                );

            })
            : <></>;



        const pivot_className = this.state.vertical_tab_layout ? 'nuTabs verticalPivot' : 'nuTabs';

        return (
            <>
                <TopMenu
                    handler={this.handler_menus}
                />
                <Pivot
                    onLinkClick={this.handler_pivot}
                    selectedKey={'' + selected_tab}
                    styles={{
                        root: {
                            margin: 50,
                        },
                        itemContainer: {
                            margin: '0 120px',
                            maxWidth: 700
                        }
                    }}
                    className={pivot_className}
                >
                    {el_tabs}
                </Pivot>
                <FormButtons
                    handler={this.handler_menus}
                    isFirstTab={this.state.prev_tab == null || this.state.prev_tab === -1}
                    isLastTab={this.state.next_tab == null || this.state.next_tab === -1}
                />
            </>
        );
    }
}



function changePivotColor(tab_title) {
    const the_tab = document.querySelector('.nuTabs .ms-Pivot .ms-Button[name="' + tab_title + '"]')
    the_tab.classList.add('new-tab');
    setTimeout(() => {
        the_tab.classList.remove('new-tab');
    }, 300);
}

function makeKey(string) {
    return string.replace(/ /g, '');
}

function getNextHighestIndex(arr, value) {
    console.log('%c : getNextHighestIndex -> arr', mcc, arr);
    console.log('%c : getNextHighestIndex -> value', mcc, value);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id > value) {
            return i;
        }
    }
    return -1;
}

function getNextLowestIndex(arr, value) {
    console.log('%c : getNextLowestIndex -> arr', mcc, arr);
    console.log('%c : getNextLowestIndex -> value', mcc, value);
    for (let i = arr.length - 1; i > -1; i--) {
        if (arr[i].id < value) {
            return i;
        }
    }
    return -1;
}

export default FormTabs;