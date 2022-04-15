import React, { ReactElement, PropsWithChildren } from 'react';
import style from './style.css';

/**
 * Defines a mapping dictionary. Each element consist of:
 * Key: becomes the column name
 * Value: Maps a row of type T, and outputs a React fragment
 */
interface MappingDictionary<T> {
    [Key: string]: (row: T) => ReactElement<any, any>;
}

type TablePropsType<T> = {
    data: Array<T>;
    visible: boolean;
    mapping: MappingDictionary<T>;
}

/**
 * Generic version of table renderer. Note that the object being rendered MUST have an id property which is a unique number.
 * @param props 
 * @returns 
 */
function MyTable<DataType extends { id: number }>(
    props: PropsWithChildren<TablePropsType<DataType>>
) {
    return (
        <div style={{ display: props.visible ? 'block' : 'none' }}>
            <table className={style.myTable}>
                <thead>
                    <tr>
                        {Object.keys(props.mapping).map((k) => (
                            <th key='-1'>{k}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((row) => (
                        <tr key={row.id}>
                            {Object.keys(props.mapping).map((k) => (
                                <td key={row.id}>{props.mapping[k](row as DataType)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyTable;