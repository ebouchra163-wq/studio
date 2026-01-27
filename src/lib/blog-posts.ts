export type Post = {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  imageId: string;
};


export const posts: Post[] = [
  {
    id: 1,
    slug: 'tendencias-logisticas-2024',
    title: '5 Tendències Logístiques a Seguir el 2024',
    date: '2024-08-01T10:00:00.000Z',
    excerpt:
      "La indústria logística està evolucionant ràpidament. Des de l'automatització fins a la sostenibilitat, explorem les tendències clau que donaran forma al 2024 i més enllà.",
    content: `
        <p>La indústria logística es troba en un estat constant de canvi, impulsada pels avenços tecnològics, les expectatives canviants dels consumidors i un enfocament creixent en la sostenibilitat. A mesura que avancem en el 2024, diverses tendències clau estan destinades a remodelar el panorama logístic.</p>
        
        <h3>1. Automatització i Robòtica</h3>
        <p>L'automatització ja no és cosa del futur; és aquí. Els magatzems estan adoptant cada vegada més sistemes de classificació automatitzats, vehicles de guiatge autònom (AGV) i drons per a la gestió d'inventari. Aquestes tecnologies augmenten l'eficiència, redueixen l'error humà i acceleren el compliment de les comandes.</p>

        <h3>2. Sostenibilitat a la Cadena de Subministrament</h3>
        <p>Les pràctiques ecològiques són ara una prioritat. Les empreses estan invertint en vehicles elèctrics, optimitzant rutes per reduir emissions i adoptant embalatges sostenibles. Una cadena de subministrament verda no només és bona per al planeta, sinó que també atrau els consumidors amb consciència ecològica.</p>

        <h3>3. Presa de Decisions Basada en Dades</h3>
        <p>El Big Data i l'analítica estan revolucionant la gestió logística. En analitzar grans conjunts de dades, les empreses poden preveure la demanda, optimitzar els nivells d'inventari i identificar possibles interrupcions abans que es produeixin, la qual cosa condueix a operacions més resilients i eficients.</p>

        <h3>4. L'Auge de la Logística d'Última Milla</h3>
        <p>Amb l'auge del comerç electrònic, l'última milla de l'entrega s'ha convertit en un camp de batalla crític. Les empreses estan experimentant amb solucions innovadores com l'entrega col·laborativa (crowdsourcing), punts de recollida i taquilles autònomes per proporcionar entregues més ràpides i flexibles.</p>

        <h3>5. Digitalització i Visibilitat en Temps Real</h3>
        <p>La tecnologia Blockchain i els sensors d'IoT estan proporcionant una visibilitat sense precedents a tota la cadena de subministrament. Els transportistes poden rastrejar les seves mercaderies en temps real, monitorar les condicions (com la temperatura) i garantir l'autenticitat i seguretat dels seus productes.</p>

        <p>Adoptar aquestes tendències serà crucial per a les empreses de logística que busquen mantenir-se competitives en un mercat dinàmic.</p>
      `,
    imageId: 'blog-post-1',
  },
  {
    id: 2,
    slug: 'importancia-de-la-logistica-inversa',
    title: 'La Creixent Importància de la Logística Inversa',
    date: '2024-07-25T14:30:00.000Z',
    excerpt:
      'La logística inversa, la gestió de devolucions i reciclatge, ja no és una idea tardana. Descobriu per què un procés eficient de logística inversa és vital per a la satisfacció del client i la sostenibilitat.',
    content: `
        <p>Tradicionalment, la logística s'ha centrat en el moviment cap endavant dels productes des del fabricant fins al consumidor. No obstant això, el flux invers de mercaderies, conegut com a logística inversa, està adquirint una importància immensa en el panorama actual del comerç electrònic.</p>
        
        <h3>Què és la Logística Inversa?</h3>
        <p>La logística inversa es refereix a tots els processos involucrats en la devolució de productes d'un client a un venedor o fabricant. Això inclou devolucions de clients, reparació i manteniment, reempaquetatge per a revenda, reciclatge i eliminació adequada.</p>

        <h3>Per què és tan important?</h3>
        <p><strong>1. Satisfacció del Client:</strong> Un procés de devolucions fàcil i sense complicacions és un motor clau de la lleialtat del client. És més probable que els compradors en línia comprin a un minorista que ofereix devolucions senzilles.</p>
        <p><strong>2. Impacte Financer:</strong> La gestió eficient de les devolucions pot recuperar un valor significatiu dels béns retornats. Els productes poden ser recondicionats, reempaquetats i revenuts, convertint una pèrdua potencial en un guany.</p>
        <p><strong>3. Sostenibilitat:</strong> Una logística inversa eficaç és un component central de l'economia circular. En lloc d'acabar en abocadors, els productes poden ser reparats, reutilitzats o reciclats, minimitzant els residus i l'impacte ambiental.</p>

        <h3>Reptes en la Logística Inversa</h3>
        <p>La gestió del flux invers presenta reptes únics. Els volums són impredictibles, la qualitat dels productes retornats varia i la logística pot ser més complexa i costosa que la logística directa. No obstant això, invertir en un sistema robust de logística inversa ja no és opcional; és essencial per a l'èxit a llarg termini.</p>
      `,
    imageId: 'blog-post-2',
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
