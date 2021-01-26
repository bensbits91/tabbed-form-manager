import * as React from 'react';
import { Web } from "@pnp/sp/presets/all";
import { tabs } from './definitions';
import FormTab from './FormTab';
import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import 'rc-tabs/assets/index.css';


const mcc = 'color:yellow;';
const mcc2 = 'color:yellow;background-color:black;';


export interface FormTabsProps {
    web: string;
    list: string;
}

export interface FormTabsState {
    fields_state: any;
    visible_tabs: any;
    // default_tab: string;
}

class FormTabs extends React.Component<FormTabsProps, FormTabsState> {
    constructor(props: FormTabsProps) {
        super(props);
        this.state = {
            fields_state: null,
            visible_tabs: [tabs.filter(t => t.show)[0].title],
            // visible_tabs: tabs.filter(t => t.show),
            // default_tab: makeKey(tabs.filter(t => t.show)[0].title)
        };
        this.handler_tab = this.handler_tab.bind(this);
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

    public handler_tab(event, field, value, checked) {
        console.log('%c : FormTabs -> handler_tab -> event', mcc2, event);
        console.log('%c : FormTabs -> handler_tab -> field', mcc2, field);
        console.log('%c : FormTabs -> handler_tab -> value', mcc2, value);
        console.log('%c : FormTabs -> handler_tab -> checked', mcc2, checked);
        if (checked) {
            this.setState({ visible_tabs: this.state.visible_tabs.concat(value) });
        }
        else {
            const my_tab = tabs.filter(t => t.title == value)[0];
            // console.log('%c : FormTabs -> handler_tab -> my_tab', mcc, my_tab);
            const tab_index = this.state.visible_tabs.indexOf(my_tab.title);
            // console.log('%c : FormTabs -> handler_tab -> tab_index', mcc, tab_index);
            if (tab_index > -1) {
                const new_tabs = this.state.visible_tabs.filter(n => n != my_tab.title);
                // console.log('%c : FormTabs -> handler_tab -> new_tabs', mcc, new_tabs);
                this.setState({ visible_tabs: new_tabs });
            }
        }
    }

    public render() {
        const { fields_state, visible_tabs/* , default_tab */ } = this.state;


        const el_tabs = fields_state
            ? visible_tabs.map(v => {
                // console.log('%c : FormTabs -> render -> v', mcc, v);

                const my_tab = tabs.filter(t => t.title == v)[0];
                console.log('%c : FormTabs -> render -> my_tab', mcc, my_tab);
                if (my_tab && my_tab.sections) {
                    my_tab.sections.map(s => {
                        // console.log('%c : FormTabs -> render -> s', mcc2, s);
                        if (s.fields)
                            s.fields.map(f => {
                                // console.log('%c : FormTabs -> render -> f', mcc2, f);
                                const this_field = fields_state.filter(field => field.InternalName == f.InternalName)[0];
                                // console.log('%c : FormTabs -> render -> this_field', mcc2, this_field);
                                f['Description'] = this_field.Description;
                                f['Required'] = this_field.Required;
                                f['Title'] = this_field.Title;
                                f['TypeAsString'] = this_field.TypeAsString;
                                f['Choices'] = this_field.Choices;
                            })
                    });
                }
                else console.log('no tab/section');
                return (
                    <TabPane
                        tab={my_tab.title}
                        key={makeKey(my_tab.title)}
                        // style={{ '.rc-tabs *:focus': { outline: '0!important'  } }}
                    >
                        <FormTab
                            tab={my_tab}
                            handler={this.handler_tab}
                        />
                    </TabPane>
                )

            })
            : <></>;


        const callback = function (key) {
            console.log('%c : FormTabs -> callback -> key', mcc, key);
        };

        return (
            <Tabs
                // defaultActiveKey={default_tab}
                onChange={callback}
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
                // style={{ '.rc-tabs *:focus': { outline: '0!important'  } }}
                className='nuTabs'
            >
                {el_tabs}
            </Tabs>
        );
    }
}



function makeKey(string) {
    return string.replace(/ /g, '');
}


export default FormTabs;