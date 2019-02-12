import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';

const Bread3 = (props) => {
    return (
        <div>
            <Breadcrumb size='large'>
                <Link to=''>
                    <Breadcrumb.Section>Home</Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider />
                <Link to='/cars'>
                    <Breadcrumb.Section>Cars</Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>{props.title}</Breadcrumb.Section>
            </Breadcrumb>
        </div>
    );
}

export default Bread3;