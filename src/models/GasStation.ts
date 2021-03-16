import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
//import { v4 as uuid } from 'uuid';

@Entity("gas_stations")
class GasStation {
    //Razão Social	CNPJ	ENDEREÇO	COMPLEMENTO	BAIRRO	CEP	UF	Municipio	Vinculação a Distribuidor Nº Autorizacao	Data Publicação DOU - Autorização Código Simp
 
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    CNPJ: string;

    @Column()
    company_name: string;

    @Column()
    address: string;

    @Column()
    complement: string;

    @Column()
    district: string;

    @Column()
    zip_code: number;

    @Column()
    FU: string;

    @Column()
    city: string;

    @Column()
    distributor: string;

    @Column()
    authorization_code: string;

    @Column()   
    authorization_date: Date;

    @Column()
    simp: number;

}

export {GasStation}