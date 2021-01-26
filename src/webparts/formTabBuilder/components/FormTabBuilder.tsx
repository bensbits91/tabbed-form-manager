import * as React from 'react';
import styles from './FormTabBuilder.module.scss';
import { IFormTabBuilderProps } from './IFormTabBuilderProps';
import FormPivot from './FormPivot';

export default class FormTabBuilder extends React.Component<IFormTabBuilderProps, {}> {
    public render(): React.ReactElement<IFormTabBuilderProps> {
        return (
            <FormPivot
                web='https://ntandem.sharepoint.com/sites/DemoDataSource01'
                list='New Hire Checklist'
            />
        );
    }
}
