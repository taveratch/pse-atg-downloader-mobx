/*eslint no-undef: "off"*/

const development = {
    USERNAME: 'root',
    PASSWORD: '',
    DB_NAME: 'pse_inventory_downloader_development',
    HOST: 'localhost',
    PORT: 3306
}

const production = {
    USERNAME: 'root',
    PASSWORD: 'pse@TGdownloader',
    DB_NAME: 'pse_inventory_downloader',
    HOST: 'sql.padungsilpa.group',
    PORT: 3306
}

export default process.env.NODE_ENV === 'production' ? production : development