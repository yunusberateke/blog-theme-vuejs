import portfoliocategory from "@/store/modules/PortfolioCategoryModule"
import portfolio from "@/store/modules/PortfolioModule"
import sendmail from "@/store/modules/SendMailModule"
import post from "@/store/modules/PostModule"
import post_category from "@/store/modules/CategoryModule"
import tag from "@/store/modules/TagModule"
import tagpost from "@/store/modules/TagPostModule"
import defaultValues from "@/store/modules/DefaultValuesModule"
import comment from "@/store/modules/CommentModule"
import account from "@/store/modules/AccountModule"
import category from "@/store/modules/CategoryModule"

import {
    PortfolioCategoryModule, PortfolioModule, SendMailModule, PostModule, PostCategoryModule,
    TagModule, TagPostModule, DefaultValuesModule, CommentModule, AccountModule, CategoryModule
} from "./namedspaces"


export default {
    [PortfolioCategoryModule]: portfoliocategory,
    [PortfolioModule]: portfolio,
    [SendMailModule]: sendmail,
    [PostModule]:post,
    [PostCategoryModule]:post_category,
    [TagModule]:tag,
    [TagPostModule]:tagpost,
    [DefaultValuesModule]:defaultValues,
    [CommentModule]:comment,
    [AccountModule]:account,
    [CategoryModule]: category
}
