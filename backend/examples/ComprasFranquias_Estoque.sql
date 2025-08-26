		--SELECT a.pedicodigo, a.emitente, m.descricao as emit, a.destinatario, ativ1.descricao as dest, ativ1.estado, 
		--       tb.codigo, c.Quantidade, convert(numeric(9,2),c.Valor) as precoproduto,  
		--		 convert(numeric(9,2),fs.unitario) as precoNota , a.datapedido, b.stnfDescricao 
		--  FROM dbo.ped_pedidototal_view a  
		--       INNER JOIN dbo.ped_statusnf b on a.stnfcodigo = b.stnfcodigo and b.stnfCancelado=0 
		--		  INNER JOIN hinode_historico.dbo.tabpedidositens_hist  c on a.pedicodigo = c.idpedido 
		--		  INNER JOIN hinode_loja.dbo.tabprodutos tb on tb.idproduto=c.idproduto 
		--		  INNER JOIN dbo.view_matriz m on m.destinatario=a.emitente and  m.pais=BRASIL 
		--		  LEFT JOIN dbo.sys_atividade ativ on ativ.destinatario_matriz=a.emitente 
		--		  LEFT JOIN dbo.view_franquias ativ1 on ativ1.destinatario=a.destinatario 
		--		  inner join dbo.Fat_Saida_view fs on a.pediCodigo=fs.pedido and fs.produto=tb.codigo 
		-- WHERE  a.DataPedido >='2025-07-23' 
		-- UNION ALL 

-- venda fabrica>franquia
-- estoque (atual)

		SELECT es.estoque_sem_box, a.pedicodigo, a.emitente, m.descricao as emit, a.destinatario, ativ1.descricao as dest, ativ1.estado, 
		       tb.codigo, c.Quantidade, convert(numeric(9,2),c.Valor) as precoproduto,  
				 convert(numeric(9,2),fs.unitario) as precoNota , a.datapedido, b.stnfDescricao 
				-- select count(*)
		  FROM dbo.ped_pedidototal_view a  
		       INNER JOIN dbo.ped_statusnf b on a.stnfcodigo = b.stnfcodigo and b.stnfCancelado=0 
				  INNER JOIN hinode_loja.dbo.tabpedidositens  c on a.pedicodigo = c.idpedido 
				  INNER JOIN hinode_loja.dbo.tabprodutos tb on tb.idproduto=c.idproduto 
				  INNER JOIN dbo.view_matriz m on m.destinatario=a.emitente and  m.pais='BRASIL'
				  LEFT JOIN dbo.sys_atividade ativ on ativ.destinatario_matriz=a.emitente 
				  LEFT JOIN dbo.view_franquias ativ1 on ativ1.destinatario=a.destinatario 
				  INNER JOIN dbo.Fat_Saida_view fs on a.pediCodigo=fs.pedido and fs.produto=tb.codigo 
				  inner join dbo.sys_estoque es on es.produto = fs.produto and es.emitente=a.emitente
				  and es.emitente<>'23551577'
		 WHERE   a.DataPedido >='2025-07-23' 
		 and fs.produto='000100'

		 select * from dbo.sys_estoque es where es.produto='000100'
		 and es.emitente='21434575'
select 734*30
-- historico estoque  (movimenta�oes)
-- periodicidade: 6 meses
-- fabrica��o/lote/vencimento produtos
select top 100 * from dbo.sys_produto
select top 100 * from hinode_loja.dbo.tabprodutos