import React from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import {useTranslation} from "react-i18next";

const MentionsLegales = () => {

    const { i18n, t } = useTranslation();

    return (
        <div className="main-container">
            <div className="main-content isMenu">
                <MenuBar items={[
                    {
                        name: `${t('account.menuBar.information')}`,
                        link: "/account"
                    },
                    {
                        name: `${t('account.menuBar.progress')}`,
                        link: "/account/progression"
                    },
                    {
                        name: `${t('account.menuBar.legals')}`,
                        link: "/account/mentions-legales",
                        active: true
                    }]}/>
                <div className={"container-padding"}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus mauris vitae magna cursus, sit amet varius tortor porttitor. Ut et neque eros. Fusce dignissim hendrerit dui in facilisis. In aliquam pretium magna at accumsan. Etiam accumsan ipsum eu velit malesuada varius. Suspendisse tempor risus dolor, sed fringilla diam hendrerit nec. Nullam facilisis feugiat odio eu ullamcorper. Ut consequat, ligula at blandit fringilla, lectus ligula molestie purus, id placerat sem sem eu just.
                        <br/>
                        <br/>
                        Aliquam eleifend libero elementum sem scelerisque consectetur.
                        <br/>
                        Fusce ac suscipit augue. Sed dapibus scelerisque luctus. Morbi lobortis, sapien lacinia dignissim dapibus, arcu nisi consectetur metus, ac condimentum nunc nisl nec lacus. Pellentesque sed iaculis mi. Maecenas malesuada eros sed dui semper, sed ultrices libero convallis. Vivamus imperdiet accumsan iaculis. Nullam consectetur tempor venenatis. Cras consequat tempor nibh, nec luctus risus iaculis id. In suscipit mauris sit amet nisi tincidunt, quis vestibulum tortor elementum.
                        <br/>
                        <br/>
                        Mauris consequat feugiat lectus et accumsan. Fusce dui mi, mollis non libero sit amet, vehicula sollicitudin lectus. Quisque at elit nec ligula fringilla bibendum.
                        <br/>
                        Phasellus mollis augue sed nunc efficitur, quis faucibus nisl aliquam. In quis felis non leo molestie tincidunt eu ac tortor. Aenean porta tincidunt tellus nec vestibulum. Aliquam auctor suscipit justo, dignissim iaculis lacus imperdiet in. Vestibulum sollicitudin feugiat diam.
                        <br/>
                        <br/>
                        Aliquam commodo consequat mi vel fringilla. Nam accumsan turpis ut leo luctus luctus id interdum ipsum. Suspendisse imperdiet ipsum et iaculis sodales. Donec tellus dolor, condimentum ac nunc ac, pretium elementum dolor. Pellentesque magna ligula, dapibus vitae mollis a, dapibus dignissim mi. Sed sit amet lectus sed ante ornare posuere ac eget odio. Maecenas placerat hendrerit orci, vitae placerat purus fermentum a. Aenean ut placerat purus. Etiam elit quam, fringilla id luctus a, ullamcorper nec metus. Duis nec dictum orci.
                        <br/>
                        <br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus mauris vitae magna cursus, sit amet varius tortor porttitor. Ut et neque eros. Fusce dignissim hendrerit dui in facilisis. In aliquam pretium magna at accumsan. Etiam accumsan ipsum eu velit malesuada varius. Suspendisse tempor risus dolor, sed fringilla diam hendrerit nec. Nullam facilisis feugiat odio eu ullamcorper. Ut consequat, ligula at blandit fringilla, lectus ligula molestie purus, id placerat sem sem eu just.
                        <br/>
                        <br/>
                        Aliquam eleifend libero elementum sem scelerisque consectetur.
                        <br/>
                        Fusce ac suscipit augue. Sed dapibus scelerisque luctus. Morbi lobortis, sapien lacinia dignissim dapibus, arcu nisi consectetur metus, ac condimentum nunc nisl nec lacus. Pellentesque sed iaculis mi. Maecenas malesuada eros sed dui semper, sed ultrices libero convallis. Vivamus imperdiet accumsan iaculis. Nullam consectetur tempor venenatis. Cras consequat tempor nibh, nec luctus risus iaculis id. In suscipit mauris sit amet nisi tincidunt, quis vestibulum tortor elementum.
                        <br/>
                        <br/>
                        Mauris consequat feugiat lectus et accumsan. Fusce dui mi, mollis non libero sit amet, vehicula sollicitudin lectus. Quisque at elit nec ligula fringilla bibendum.
                        <br/>
                        Phasellus mollis augue sed nunc efficitur, quis faucibus nisl aliquam. In quis felis non leo molestie tincidunt eu ac tortor. Aenean porta tincidunt tellus nec vestibulum. Aliquam auctor suscipit justo, dignissim iaculis lacus imperdiet in. Vestibulum sollicitudin feugiat diam.
                        <br/>
                        <br/>
                        Aliquam commodo consequat mi vel fringilla. Nam accumsan turpis ut leo luctus luctus id interdum ipsum. Suspendisse imperdiet ipsum et iaculis sodales. Donec tellus dolor, condimentum ac nunc ac, pretium elementum dolor. Pellentesque magna ligula, dapibus vitae mollis a, dapibus dignissim mi. Sed sit amet lectus sed ante ornare posuere ac eget odio. Maecenas placerat hendrerit orci, vitae placerat purus fermentum a. Aenean ut placerat purus. Etiam elit quam, fringilla id luctus a, ullamcorper nec metus. Duis nec dictum orci.
                        <br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus mauris vitae magna cursus, sit amet varius tortor porttitor. Ut et neque eros. Fusce dignissim hendrerit dui in facilisis. In aliquam pretium magna at accumsan. Etiam accumsan ipsum eu velit malesuada varius. Suspendisse tempor risus dolor, sed fringilla diam hendrerit nec. Nullam facilisis feugiat odio eu ullamcorper. Ut consequat, ligula at blandit fringilla, lectus ligula molestie purus, id placerat sem sem eu just.
                        <br/>
                        <br/>
                        Aliquam eleifend libero elementum sem scelerisque consectetur.
                        <br/>
                        Fusce ac suscipit augue. Sed dapibus scelerisque luctus. Morbi lobortis, sapien lacinia dignissim dapibus, arcu nisi consectetur metus, ac condimentum nunc nisl nec lacus. Pellentesque sed iaculis mi. Maecenas malesuada eros sed dui semper, sed ultrices libero convallis. Vivamus imperdiet accumsan iaculis. Nullam consectetur tempor venenatis. Cras consequat tempor nibh, nec luctus risus iaculis id. In suscipit mauris sit amet nisi tincidunt, quis vestibulum tortor elementum.
                        <br/>
                        <br/>
                        Mauris consequat feugiat lectus et accumsan. Fusce dui mi, mollis non libero sit amet, vehicula sollicitudin lectus. Quisque at elit nec ligula fringilla bibendum.
                        <br/>
                        Phasellus mollis augue sed nunc efficitur, quis faucibus nisl aliquam. In quis felis non leo molestie tincidunt eu ac tortor. Aenean porta tincidunt tellus nec vestibulum. Aliquam auctor suscipit justo, dignissim iaculis lacus imperdiet in. Vestibulum sollicitudin feugiat diam.
                        <br/>
                        <br/>
                        Aliquam commodo consequat mi vel fringilla. Nam accumsan turpis ut leo luctus luctus id interdum ipsum. Suspendisse imperdiet ipsum et iaculis sodales. Donec tellus dolor, condimentum ac nunc ac, pretium elementum dolor. Pellentesque magna ligula, dapibus vitae mollis a, dapibus dignissim mi. Sed sit amet lectus sed ante ornare posuere ac eget odio. Maecenas placerat hendrerit orci, vitae placerat purus fermentum a. Aenean ut placerat purus. Etiam elit quam, fringilla id luctus a, ullamcorper nec metus. Duis nec dictum orci.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MentionsLegales;
