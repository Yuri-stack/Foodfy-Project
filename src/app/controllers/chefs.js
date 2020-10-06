const Chef = require('../models/Chef')

module.exports = {

    //Função para LISTAR as receitas no Index da Administração
    index(req, res){

        Chef.all(function(chefs){
            return res.render('admin/chefs/index.njk', { chefs })
        })

    },

    //Função que REDIRECIONA para a página de criação
    redirectCreate(req, res){
        return res.render('admin/chefs/create.njk')
    },

    //Função para CADASTRAR um novo Chef
    post(req, res){

        const keys = Object.keys(req.body)          //Aqui eu pego todos os campos(keys) do formulário de chefs

        for(key of keys){                           //verificando se cada key está preenchidas
            if(req.body[key] == ""){                //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send("Please fill in all the fields!") 
            }
        }

        Chef.create(req.body, function(chef){
            return res.redirect(`/chefs/${ chef.id }`)
        })

    },

    //Função para MOSTRAR os detalhes da receitas
    show(req, res){

        Chef.find(req.params.id, function(chef){
            
            if(!chef) return res.send("Chef not found")

            return res.render("admin/chefs/details", { chef })
        })

    },

    //Função para CARREGAR INFORMAÇÕES PARA EDITAR
    edit(req, res){

        Chef.find(req.params.id, function(chef){

            if(!chef) return res.send("Chef not found")

            return res.render('admin/chefs/edit', { chef })
        })


    }

}