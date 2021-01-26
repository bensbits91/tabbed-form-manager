import * as React from 'react';
import FormSection from './FormSection';

import styles from './FormTab.module.scss';

const mcc = 'color:lime';


export interface FormTabProps {
    tab: any;
    handler: any;
}

export interface FormTabState {

}

class FormTab extends React.Component<FormTabProps, FormTabState> {
    constructor(props: FormTabProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { tab } = this.props;
        console.log('%c : FormTab -> render -> tab', mcc, tab);


        const sections = tab.sections
            ? tab.sections.map(s => {
                return (

                        <FormSection
                            key={s.id}
                            section={s}
                            handler={this.props.handler}
                        />
                );
            })
            : <></>;

        return (
            <div>
                <div className={styles.tabHeader}>{tab.title}</div>
                <div>
                        {sections}
                </div>
            </div>
        );
    }
}

export default FormTab;