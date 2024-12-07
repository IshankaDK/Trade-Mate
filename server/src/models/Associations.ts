import CurrencyPair from "./CurrencyPair";
import User from "./User";
import Playbook from "./PlayBook";

export const configAssociations = () => {

    User.hasMany(CurrencyPair, {
        foreignKey: "userId",
        as: "currencyPairs",
    });

    CurrencyPair.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
    });


    User.hasMany(Playbook, {
        foreignKey: "userId",
        as: "playbooks",
    })

    Playbook.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
    });

}