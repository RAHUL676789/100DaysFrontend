import React,{useState,useRef} from 'react'

const ScrollProgressBar = () => {
    const [progressWidth, setprogressWidth] = useState(0)
    const scrollRef = useRef(null)

    const handleScroll = ()=>{
        console.log("helo")
        const container = scrollRef?.current;

        console.log(container.scrollTop / (container.scrollHeight - container.clientHeight))
        
      const scrollPercent = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
      setprogressWidth(Math.ceil(scrollPercent));
    }
  return (
    <div onScroll={handleScroll} ref={scrollRef} className='relative h-screen overflow-y-scroll max-w-screen no-scrollbar'>
      <div className="div fixed top-0 w-full h-2 bg-white flex justify-center items-center">
          <div  style={{width:progressWidth+"%"}}  className='bg-green-600 fixed top-0 left-0 h-2 transition-all duration-150'>

        </div>
      </div>
        <div className="content m-4 py-5 px-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, expedita! Reiciendis obcaecati ipsum sunt nulla quasi recusandae quaerat, doloremque explicabo harum in accusamus! Nihil vero officiis eaque doloremque repellat dignissimos!Lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto id eligendi, nisi consequuntur harum eum doloremque velit reiciendis aliquid fuga iure amet tempora unde similique, ipsa deserunt consectetur officiis quae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates corrupti reprehenderit quae asperiores neque quibusdam aut! Fuga harum ratione corporis itaque at numquam, facere qui vero, saepe ad quis amet.
            Nisi in recusandae quod distinctio fuga vel temporibus fugit. Vel assumenda nostrum, cumque incidunt earum officiis inventore sapiente. Corrupti at quos eveniet tenetur ea dicta maiores numquam, deserunt quibusdam aspernatur.
            Ut illo quod, non perferendis explicabo ratione porro ea officia aut temporibus, maiores beatae dolorem. Aperiam velit iure cupiditate rerum, molestias, consequuntur praesentium eveniet odio placeat qui laboriosam numquam? Minima!
            Non distinctio labore incidunt eveniet officia. Nam repellat, dolor tempora adipisci nihil voluptatem nemo quisquam eligendi sunt cupiditate totam earum consequatur soluta illo aspernatur porro iste minima saepe repellendus. Quia?
            Aliquid at possimus perferendis molestias enim sapiente repudiandae aperiam. Enim non officiis, eos, error amet culpa qui ducimus delectus exercitationem cum maiores saepe ea voluptate sint temporibus accusantium? Facilis, reiciendis!
            Quam adipisci enim possimus repellat tempora. Quasi fuga nam modi praesentium eos odit vitae aut rerum numquam voluptatem blanditiis quod consectetur, maxime, hic, optio magni delectus architecto perferendis illo repudiandae.
            Sint accusamus laboriosam amet, ipsa dolore eaque, cupiditate deserunt distinctio doloremque molestiae reprehenderit labore voluptatibus possimus quod autem! Voluptatem harum nam ab quis maiores, nostrum eum fugiat nemo perferendis. Exercitationem?
            Laudantium error eius doloremque voluptas eligendi similique odit accusamus ducimus, quam explicabo, et, repellendus consequuntur delectus obcaecati commodi. Eaque obcaecati eum quas non quam iure dolores, nisi sint incidunt aliquid!

            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut perferendis animi nihil ex deleniti ipsum eius alias modi quae nulla esse minima qui tenetur placeat, illo illum vero fugiat pariatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error laboriosam vel autem veniam, voluptatem a fuga at corporis ea optio inventore aliquam, enim aspernatur tempore neque officia eaque qui dolorum!
            Ut quis amet, consectetur sapiente tempore rerum nisi nostrum, et id blanditiis iure illo placeat at dolores quibusdam labore nihil accusantium quo doloribus, natus pariatur? Non, quia? Rem, a ab.
            Delectus quae laboriosam sit, adipisci obcaecati molestiae iure aliquam perferendis. Mollitia unde eaque eum fuga fugit excepturi explicabo nemo qui labore a saepe esse quisquam, ipsam, maiores debitis, repudiandae accusantium.
            Ipsa aperiam labore reiciendis maxime praesentium sequi pariatur quidem sed, explicabo rem laborum consequuntur, voluptatibus tempora quod! Iure corrupti asperiores ipsam eligendi autem sit cupiditate, quibusdam consequatur dicta maxime aperiam?
            Quam, sed eaque aut, possimus libero porro, ea ipsam magnam delectus corporis harum magni corrupti a inventore ratione distinctio aperiam sint debitis molestias excepturi reiciendis voluptatibus! Commodi quam repellat ipsa.
            Qui fuga libero rem. Vero vel ducimus, nesciunt consequatur culpa saepe quo eum, consequuntur porro incidunt quos sequi suscipit. Sunt, magnam! Omnis distinctio eaque velit non veniam, voluptatum itaque mollitia.
            Quisquam expedita voluptatibus doloremque sed molestias rem. Quasi facere fugiat voluptatum hic? Vitae corporis odit facilis repellat nostrum nisi adipisci fuga! Reprehenderit pariatur dolor officia itaque quam fugit unde illum.
            Distinctio harum dolore nisi eveniet ab deleniti aperiam aspernatur magnam incidunt eos, sunt reprehenderit cum fugiat nemo provident, molestias maxime soluta mollitia officiis exercitationem! A at repellat eius eum ullam.
            Deserunt accusamus, debitis numquam enim sit non inventore suscipit unde ipsam consequuntur dolorum optio? Iste minima, dolores quia molestias veritatis, fugiat assumenda ratione itaque id reprehenderit laboriosam nam eveniet ipsa.
            Nulla nemo vitae error consequatur quisquam soluta ad tempore. Expedita consequatur suscipit rem, neque libero quae animi voluptates laborum, voluptatem, odio velit repellendus. Mollitia unde, odio similique tenetur officiis neque.
            Architecto porro aliquam iste neque sint minus inventore, alias sit illo dolore iure doloremque temporibus, deleniti dolorem? Nemo hic doloremque consectetur iure officiis, soluta vero? Asperiores voluptas assumenda quo eos.
            Laboriosam saepe quo aperiam dolorem iure fuga error accusamus distinctio beatae consequuntur quos quaerat fugit cumque necessitatibus sed alias modi illo, facere tempora fugiat perspiciatis voluptates explicabo. Quaerat, enim natus.
            Ipsa repellat explicabo qui reprehenderit minus, voluptatum inventore voluptate doloremque? Ipsa aperiam amet molestias vitae facere ab ducimus, blanditiis corporis eaque, doloremque dolore adipisci. Voluptate perspiciatis aperiam nostrum fuga inventore.
            Animi mollitia necessitatibus temporibus dolore quasi repudiandae quia maiores placeat, repellendus aliquam? Alias, facilis quam repellendus sapiente error, consequuntur quae nam eveniet incidunt sed nesciunt enim laudantium. Excepturi, at iste?
            Ex incidunt ducimus aliquam, sed adipisci vero expedita corporis sequi omnis beatae quidem est ipsam enim cupiditate reprehenderit possimus! Natus rem velit harum laborum corrupti, asperiores quam accusamus esse magni?
            Quae praesentium sequi porro nostrum provident ullam repellat officiis voluptatibus, saepe nisi facilis nobis sed adipisci obcaecati consectetur voluptatem vero, ad sint iste possimus corrupti et explicabo dicta quaerat? Quisquam.
            Sint sed corporis amet repellendus consectetur quas, optio officia, omnis libero accusantium labore nostrum, sit dolore iusto quasi quidem eveniet asperiores doloremque fugiat delectus! Voluptates reprehenderit modi hic sequi fuga.
            Illum veniam corrupti ut doloribus tenetur earum omnis tempora ullam explicabo deserunt, voluptate soluta. Rem aspernatur, sequi velit sapiente quo voluptates nulla et doloribus, ipsa voluptatibus ipsum quibusdam modi temporibus!
            Consequatur id eius accusamus ipsum. Fuga quia nobis, cum iusto ut sunt ea saepe, vel optio provident fugiat sed quos pariatur delectus illo molestiae fugit accusamus, dignissimos architecto doloribus dolorum?
            Officia laboriosam incidunt perspiciatis molestias, eveniet illo beatae labore esse. Commodi quas veritatis quam libero, placeat dolor. Iusto et veritatis hic qui vero praesentium rem saepe laudantium, quas, facere nemo.
            Eius, ea amet. Nisi provident possimus ipsum, ad, reprehenderit dignissimos architecto atque voluptatem adipisci eius necessitatibus! Eaque adipisci quas nobis maiores hic, tempora ea dicta repellat, minima recusandae, est eligendi?
            Nisi dolorem ut magnam nihil, laborum laudantium mollitia quo sapiente suscipit, ipsum illo architecto expedita voluptatum eaque quidem facilis. Quo assumenda odio velit laboriosam at unde incidunt doloribus magni molestiae?
            Libero provident at placeat est, voluptas ullam aperiam iusto hic consequuntur facere possimus nesciunt numquam minus animi dicta cumque obcaecati nobis eaque quaerat rerum cupiditate, tempora recusandae corrupti! Labore, recusandae.
            Amet quod voluptate laboriosam laborum, numquam nisi molestias minus porro labore, asperiores fugit! Atque error labore sint, harum omnis reprehenderit pariatur tempore tempora, odit maiores aperiam eos modi saepe dolor!
            Illum quaerat, dicta veniam ducimus in pariatur delectus tempora et quisquam dignissimos beatae ut quam perspiciatis hic eum ea officia nostrum possimus corrupti facere optio illo? Dolores saepe unde porro.
            Vel eveniet minus aliquam sint veritatis dignissimos temporibus officia hic fuga? Harum assumenda consectetur dolore ullam, magni tempora architecto commodi illum error mollitia vel perferendis velit est totam consequuntur cum!
            Maxime magnam vero cupiditate debitis autem laboriosam, assumenda quam distinctio maiores quaerat, soluta incidunt eligendi sunt non nam error? Cum hic debitis repudiandae veritatis laudantium ea saepe, temporibus facilis molestias?
            Accusantium enim ad aspernatur quis possimus, ducimus nihil totam. Vel nostrum ullam sequi tenetur obcaecati, ipsa ab et voluptatum dolorem dolores dolorum quod doloremque animi beatae. Officiis quos soluta exercitationem?
            Animi iste cum esse, quasi illo deleniti, eaque aliquid saepe suscipit dolorem exercitationem cumque fuga earum, ipsum non ab rem ullam quis dignissimos dolorum facilis mollitia assumenda! Itaque, aut ipsam.
            Dolore voluptatum tempora sint numquam temporibus amet perferendis non libero error nam suscipit vel nisi aspernatur deleniti, soluta iusto est, illum consequuntur optio tenetur excepturi atque veritatis. Harum, corporis in!
            Suscipit porro ad quod atque perspiciatis mollitia aliquam, illo labore asperiores doloremque esse dolorum accusamus voluptatem dolores reprehenderit soluta? Velit consequatur ut mollitia voluptas iure debitis doloribus, quod error facere.
            Sed, delectus explicabo eum doloremque a ad saepe expedita fugiat officia quod, dignissimos odit repudiandae possimus perferendis ullam eligendi animi mollitia amet autem reiciendis debitis aspernatur, maiores nihil. Accusamus, reiciendis!
            A ab perferendis tempore repellendus enim, alias et reiciendis dolores dolore at soluta obcaecati praesentium numquam aut deserunt. Beatae, ratione tenetur adipisci eius consequatur laboriosam dolor nam ipsam officiis voluptates.
            Nam eos ipsum impedit non aliquid mollitia quasi nulla illo esse ratione cum architecto, provident asperiores quibusdam quia odio animi quidem necessitatibus neque ea reiciendis. Voluptas magni doloribus saepe dolor.
            Odio, quisquam! Aliquam quia voluptas quae debitis quos alias a. Quaerat accusamus fuga, doloribus asperiores illo provident quidem corrupti earum harum dolore deserunt ipsam culpa ut omnis saepe commodi aut.
            Ducimus, cupiditate maxime. Sed mollitia quidem animi temporibus ea fuga aspernatur tempora accusantium distinctio pariatur magnam praesentium nostrum quos, culpa nobis ad delectus impedit velit, repudiandae harum exercitationem repellat hic!
            Consequatur ullam, placeat explicabo, dolore, nesciunt ipsum quos earum animi recusandae optio voluptatem officiis eum quibusdam. Sed exercitationem numquam nisi? Consequuntur minus deserunt delectus sapiente numquam odio unde voluptate vitae!
            Unde illum quaerat placeat odit, quo ipsam dolores, corrupti tenetur laboriosam eaque quidem! Illum porro sequi culpa error itaque debitis doloribus atque, commodi esse repellat ab suscipit, praesentium numquam tempore!
            Facere sint sit, quis libero eaque ratione iure quod quas quidem velit, unde ipsam! Itaque aliquam deserunt et dolor recusandae. Accusantium eos cum laborum architecto explicabo vero praesentium animi laudantium!
            Odit dolorum deserunt deleniti nulla quidem officia non et magni excepturi perferendis, a dolores laborum, necessitatibus praesentium voluptatem saepe commodi? Quos nulla cumque in commodi ad! Neque adipisci odit aspernatur?
            Dolor at ducimus, unde eius maiores, accusamus corporis consectetur esse aut tempore minima praesentium, obcaecati consequatur laborum voluptatibus sapiente. Expedita quidem laborum maiores animi pariatur quaerat totam quibusdam cumque dolorum.
            Explicabo hic soluta eligendi, asperiores consequuntur rem quas fuga molestiae porro quis distinctio mollitia modi ipsam non accusamus laudantium consectetur ab neque sapiente, facere nam vitae deleniti quidem. Beatae, error?
            Excepturi temporibus, dolore explicabo natus, ducimus itaque commodi aspernatur reprehenderit iusto blanditiis, nihil mollitia odit ullam. Illo temporibus adipisci praesentium dolore doloribus reiciendis quae at, explicabo dolorem, in esse non!
            Perferendis hic nam temporibus quisquam possimus inventore, aut quibusdam voluptatem odio molestiae fugiat magni! Facilis quidem eum aliquam dolorem porro dolor nisi deleniti amet laboriosam. Itaque in dolore asperiores corporis.
            Harum libero ea velit totam, sed suscipit nisi accusamus illo sequi nihil exercitationem provident delectus laborum ut. Exercitationem molestias animi et vero sit enim laboriosam labore minima. Quod, iure rem.
            Suscipit eius quam libero, quisquam accusamus fugit in. Harum eveniet dolor nesciunt aliquam pariatur molestias alias sint inventore officia quaerat cumque fugit, ab tempora unde. Commodi ratione hic earum velit?
            Adipisci atque nemo dolores reiciendis dolorum, officiis magnam commodi necessitatibus eius illo, voluptas dolor nostrum iste eligendi tenetur sit nulla eveniet consequuntur deserunt ut, aliquam deleniti! Totam, omnis qui. Ut?
            Eius ducimus rem fugit quod explicabo perspiciatis laboriosam nisi veniam consectetur officiis exercitationem unde tempore quos porro placeat cumque quasi, pariatur corrupti nobis atque dolor, suscipit amet dicta commodi. Accusantium.
            Natus amet esse cumque possimus dolorem vel mollitia dolor? Atque laborum numquam deleniti neque placeat natus unde cum, error itaque ex aperiam amet repellat possimus ipsa quasi, aliquid aliquam quae.
            Omnis ab ipsam at expedita enim quam maiores necessitatibus totam nihil porro velit, fugit sequi voluptatem assumenda odio nesciunt quaerat eaque deserunt ea alias similique debitis? Veritatis saepe assumenda labore.
            Laboriosam voluptatem doloribus dignissimos quis molestiae dolorem mollitia accusantium natus unde quo quidem molestias incidunt rerum eaque ut amet vitae, facilis, obcaecati, reiciendis et vel pariatur. Quos, libero. Aut, beatae.
            Ea beatae corrupti amet! Quia amet dolorum reprehenderit alias veniam? Aperiam odio culpa officiis deserunt autem rem magni tenetur, nam unde molestiae fugit modi rerum, asperiores ex nisi non harum.
            Atque quaerat fugit quae dolor similique sit aut porro ut odit sed, amet hic molestias, rerum incidunt unde. Hic repellendus expedita rem a molestias provident quisquam minus perferendis itaque error.
            Reprehenderit, accusamus? Nulla, aut nihil aspernatur qui consequatur fugit itaque id voluptates ab alias distinctio perferendis sapiente odit sit maxime rerum. Quas voluptatibus inventore, facilis tempore dolorem harum explicabo optio.
            Voluptatem sequi dolore inventore quaerat, at sapiente iure. Enim quas corrupti numquam ipsum expedita quidem aut voluptatum vel rerum quod et minus, similique deserunt ipsam eligendi aspernatur suscipit, voluptate magnam?
            Earum sapiente voluptas ipsum et aliquam a nesciunt maxime rem? Delectus nulla perferendis mollitia aperiam modi laborum, harum aliquam corporis minima voluptate ea quis dolorem quae, in nam dolores sequi.
            Ea quibusdam, esse doloremque, fugiat illum quidem distinctio quae dolor iure excepturi aspernatur placeat voluptate veritatis laudantium voluptates odio culpa alias dolorem labore corrupti accusantium perferendis dicta debitis! Consequuntur, voluptas?
            Tenetur corporis modi distinctio unde est accusantium deserunt at perferendis, numquam quis quia in? Nobis aliquid at fugit ad doloremque, cum ab. Excepturi, perspiciatis. Repudiandae quas facilis nihil ullam voluptate?
            Suscipit necessitatibus assumenda dolorum consectetur, neque quaerat, enim, ipsa explicabo voluptas pariatur error minus laborum dolor quis eaque officiis? Expedita blanditiis eligendi tenetur necessitatibus sapiente sunt minima iusto ratione veritatis!
            Magni enim, saepe excepturi possimus quos recusandae sapiente id odio mollitia quaerat aperiam beatae debitis provident! Provident omnis modi doloribus, praesentium quia vero, eveniet aspernatur minus quae quibusdam eius velit?
            Itaque sapiente in non maiores accusamus asperiores, ut nostrum. Maxime repudiandae reiciendis saepe! Perspiciatis iure culpa ratione soluta veritatis magni consectetur voluptatem enim qui officia facere, error, repellat ducimus non.
            Blanditiis nemo cumque, velit omnis quae iste deserunt doloremque debitis nihil ipsam maxime rerum impedit autem fuga ipsa, animi distinctio eius, a sit quod. Amet iure maxime neque animi modi.
            Consectetur non labore asperiores cumque laudantium deserunt quam tempore possimus dolore illum? Tenetur, magnam, quaerat rem eveniet, inventore nisi veniam quod ducimus doloremque excepturi assumenda eos facere illo perspiciatis odit!
            Minima magni molestiae ipsa voluptatibus incidunt tempore, earum in pariatur modi nostrum fuga reprehenderit illum quaerat cum dolores distinctio iusto eos rerum sit fugit cupiditate quas asperiores odio. Modi, assumenda.
            Sequi iusto nemo voluptas ullam eum. Quaerat, blanditiis officiis laudantium, minus aspernatur natus unde libero, nulla hic quasi incidunt suscipit! Excepturi tempora amet totam sed eos, rem deleniti fugit optio.
            Porro natus perspiciatis commodi mollitia, exercitationem animi aliquid consequuntur nostrum nemo in placeat iusto velit dolore earum sint ullam similique voluptate accusantium aut optio! Molestias quod exercitationem quasi reprehenderit non!
            Itaque corporis laboriosam voluptates nostrum, maiores perspiciatis animi dolorem ullam modi totam iure dolor numquam distinctio dignissimos, placeat odit laudantium, quasi iste cupiditate. Minus adipisci nemo corrupti laboriosam, aliquid dignissimos?
            Corrupti, quam porro neque inventore beatae sapiente! Autem, temporibus minima! Quasi at itaque fuga accusamus magni omnis illum, saepe tenetur ducimus, sint fugit vero ipsa obcaecati reprehenderit quidem nulla asperiores!
            Sequi nobis ducimus, animi, ratione qui quidem, adipisci blanditiis maxime laborum eligendi dolores voluptatem ipsa fugiat minus reiciendis vel cumque dignissimos repellat! Culpa assumenda consequatur vero sed modi! Dicta, officia.
            Expedita dolore asperiores doloremque laboriosam eligendi neque voluptatibus suscipit facilis mollitia in similique natus, qui incidunt alias rem cum quasi quia delectus, eius, corporis porro odit voluptatum ipsam tempora! Sequi?
            Ratione tenetur libero doloremque ut rerum praesentium quod dignissimos, assumenda consequatur id! Earum iste labore ut dolorum? Mollitia quasi dolorem maxime quia. Velit sequi a optio omnis minus quisquam praesentium?
            Fugit suscipit quis iure neque quam inventore, voluptas deleniti dignissimos sequi fugiat cupiditate doloremque nesciunt eveniet rem sapiente perspiciatis dicta voluptatum non pariatur, distinctio similique consequatur ullam labore. Eligendi, ullam!
            Atque voluptatibus reiciendis nemo totam est ipsa, sapiente magni quidem asperiores exercitationem officia a, architecto repudiandae, incidunt quibusdam vitae quisquam libero dolore officiis esse eligendi. Nemo suscipit aut illo dolore.
            Veritatis laboriosam tenetur sint animi perspiciatis nam, reprehenderit rem optio provident velit maiores blanditiis necessitatibus ipsum delectus accusantium aperiam, quia vel minima, recusandae labore molestias ratione qui. Tempore, eum delectus.
            Obcaecati reiciendis debitis similique, ea animi maiores, itaque fugit, quae illum vel possimus ad iure sunt voluptatibus aperiam nulla doloribus unde ullam commodi quod! Quis autem numquam veritatis ad eveniet?
            Sunt ipsa nihil perspiciatis sequi velit consequatur? Cupiditate temporibus nisi, iste a repudiandae, dolorum, labore ipsum soluta molestias mollitia vel tempora. Nesciunt eum, perspiciatis rem ratione nulla quia inventore explicabo?
            Soluta animi enim pariatur architecto porro, velit, ipsa iure eum repellat est corporis quidem autem reprehenderit beatae praesentium id totam optio nostrum doloribus quas voluptates sed incidunt labore. Commodi, quam.
            Aliquid ad eum corporis! Aliquid nulla et, quasi ratione ipsum corrupti assumenda dicta maxime culpa consectetur veritatis, optio nobis. Rem eligendi quibusdam aliquam possimus accusantium id totam, eveniet inventore reiciendis.
            Cupiditate, error exercitationem! Sit, minima harum ipsum aperiam aspernatur cupiditate omnis quae, velit voluptatibus inventore accusantium, quidem facere consectetur minus nulla iure amet. Voluptatum animi ex eos nesciunt numquam suscipit!
            Unde inventore deserunt excepturi repudiandae quidem? Excepturi magnam id atque consequatur non sequi fugit aut commodi soluta, maxime, saepe, velit veritatis debitis eveniet dolores maiores eos. Consequatur sint minus quos!
            Aspernatur magni, voluptatem pariatur voluptatum in labore consectetur harum officia inventore nostrum facere fuga sapiente ipsum aliquam voluptate id quaerat expedita, voluptatibus fugiat modi, numquam ut. Iure nam quam veniam.
            Deleniti sapiente ut amet, mollitia nemo tempore quam, facere cupiditate beatae voluptatum minima at autem architecto. Quo blanditiis molestiae, neque ullam dicta totam. Dignissimos sunt magnam saepe, facilis ratione sequi!
            Sequi mollitia exercitationem ut repellat. Necessitatibus, nobis sed. Architecto officiis pariatur, molestiae ut, vel, nam aut odit culpa commodi expedita illum corrupti veniam maxime ex et est perspiciatis voluptate aperiam.
            Dolor dolorum iure inventore, officiis nesciunt quasi. Veniam, numquam error ex necessitatibus libero culpa ea, nam fuga quos alias iure totam labore ab voluptatem odit. Voluptatem aperiam deserunt sapiente dicta.
            Animi ad maxime, inventore adipisci doloremque illo facilis mollitia ipsam officia quibusdam fugiat commodi suscipit quod dolore placeat voluptatem nostrum vitae? Consectetur nulla veniam repellat possimus ex. Possimus, odit adipisci?
            Harum magnam aliquam vero exercitationem nulla quisquam explicabo corrupti id debitis velit, quis officia deserunt impedit saepe sunt temporibus possimus aut doloribus, in consectetur facilis, accusamus praesentium odio? At, dolorem!
            Eaque, delectus saepe repellendus, exercitationem provident debitis dolorem voluptatibus dolorum ea quia fugiat error inventore non nihil! Beatae velit amet aliquam quam reprehenderit tenetur ab neque. Tenetur iure maiores voluptates.
            Explicabo sapiente pariatur ab vel id? Dolorum, rem impedit vel esse blanditiis placeat ducimus tempore dignissimos tempora, optio maxime! Eveniet, labore unde? Nobis nihil doloribus est voluptatum ipsam dolor architecto?
            Doloribus minima, natus perspiciatis, ipsum ipsa optio sed quaerat, quae reprehenderit vitae voluptate facilis repellat dolores sapiente! Nobis nesciunt, maiores, molestias aperiam ex corporis placeat ratione atque tenetur rem et!
        </div>
      
    </div>
  )
}

export default ScrollProgressBar
